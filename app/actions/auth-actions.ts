"use server"
import { auth } from "@/auth/auth"
import { signIn } from "@/auth/auth"
import { userRegisterSchema, userLoginSchema } from "@/schemas"
import { z } from 'zod'
import { prisma } from "@/prisma/prisma"
import { generatePassword } from "@/lib/utils"
import { hash, genSalt } from "bcryptjs"
import { AuthError } from "next-auth"
import { sendPasswordEmail } from "./mail-actions"

export async function isSessonActive() {
    const session = await auth()
    const user = session?.user?.id
    if (user) {
        return true
    }
    return false
}

export async function loginAdmin(data: z.infer<typeof userLoginSchema>) {
    const validatedData = userLoginSchema.parse(data)
    if (!validatedData) {
        return {
            error: "Invalid data",
            success: false
        }
    }

    const { email, password } = validatedData;

    const userExists = await prisma.admin.findUnique({
        where: {
            email: email
        }
    })

    if (!userExists || !userExists.password || !userExists.email) {
        return {
            error: "User not found",
            success: false
        }
    }

    try {
        await signIn("credentials", {
            email: userExists.email,
            password: password,
            role: "admin",
            redirectTo: "/admin/adminHome",
        })
    }
    catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials",
                        success: false
                    };
                default:
                    return {
                        error: "Email or password is incorrect",
                        success: false
                    };
            }
        }

        throw e;
    }

    return {
        message: "login success",
        success: true
    }

}

export async function loginAction(data: z.infer<typeof userLoginSchema>): Promise<LoginActionResult> {

    const validatedData = userLoginSchema.parse(data)
    if (!validatedData) {
        return {
            error: "Invalid data",
            success: false
        }
    }

    const { email, password } = validatedData;

    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!userExists || !userExists.password || !userExists.email) {
        return {
            error: "User not found",
            success: false
        }
    }

    try {
        await signIn("credentials", {
            email: userExists.email,
            password: password,
            redirectTo: "/onboarding",
        })
    }
    catch (e) {
        if (e instanceof AuthError) {
            switch (e.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials",
                        success: false
                    };
                default:
                    return {
                        error: "Email or password is incorrect",
                        success: false
                    };
            }
        }

        throw e;
    }

    return {
        message: "login success",
        success: true
    }
}

export async function registerAction(data: z.infer<typeof userRegisterSchema>): Promise<RegisterActionResult> {
    console.log("registerAction triggered", data)
    try {
        const validatedData = userRegisterSchema.parse(data)
        if (!validatedData) {
            return { error: "Invalid data", success: false }
        }
        const user = await prisma.user.findUnique({
            where: {
                email: validatedData.email
            }
        })
        if (user) {
            return { error: "User already exists", success: false }
        }
        const password = generatePassword({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            mobileNumber: validatedData.mobileNumber
        })
        console.log("password", password)
        try {
            // Start the email sending without awaiting
            sendPasswordEmail(validatedData.email, password)
                .then(mailSend => {
                    if (!mailSend.success) {
                        console.log("Email sending failed but user registration continued");
                    }
                })
                .catch(error => {
                    console.error("Async email error:", error);
                });

        }
        catch (e) {
            console.log("Error initiating email send", e);
            return { error: "Email could not be sent", success: false };
        }
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)
        const createdUser = await prisma.user.create({
            data: {
                firstName: validatedData.firstName,
                middleName: validatedData.middleName,
                lastName: validatedData.lastName,
                email: validatedData.email,
                password: hashedPassword,
                mobileNumber: validatedData.mobileNumber,
                gender: validatedData.gender,
                dob: new Date(validatedData.dob),
                applyingYear: validatedData.applyingYear,
                quota: validatedData.quota,
                program: validatedData.program,
                aadharNo: parseInt(validatedData.aadharNo),
                religion: validatedData.religion,
                cast: validatedData.cast,
                createdAt: new Date(),
            },
        })
        if (!createdUser) {
            return { error: "User not created", success: false }
        }
        return { message: "User created successfully", success: true }

    } catch (e) {
        console.log(e)
        return { error: "user creation failed", success: false }
    }
}

export async function getUser(email: string) {

    try {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user data");
    }

}
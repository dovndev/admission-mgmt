"use server"
import { auth } from "@/auth/auth"
import { signIn } from "@/auth/auth"
import userRegisterSchema from "@/schemas"
import { z } from 'zod'
import { prisma } from "@/prisma/prisma"
import { generatePassword } from "@/lib/utils"
import { hash, genSalt } from "bcryptjs"
export async function isSessonActive() {
    const session = await auth()
    const user = session?.user?.id
    if (user) {
        return true
    }
    return false
}

export async function loginAction(email: string, password: string) {

    console.log("loginAction", email, password)
    const response = await signIn("credentials", {
        email: email,
        password: password,
    })
    console.log("response", response)
}

export async function registerAction(data: z.infer<typeof userRegisterSchema>) {
    console.log("registerAction triggered", data)
    try {
        const validatedData = userRegisterSchema.parse(data)
        if (!validatedData) {
            return { error: "Invalid data" }
        }
        const user = await prisma.user.findUnique({
            where: {
                email: validatedData.email
            }
        })
        if (user) {
            return { error: "User already exists" }
        }
        const password = generatePassword({
            firstName: validatedData.firstName,
            lastName: validatedData.middleName,
            mobileNumber: validatedData.mobileNumber
        })
        //need to add code to send email
        // {}
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
            return { error: "User not created" }
        }
        return { message: "User created successfully" }

    } catch (e) {
        console.log(e)
    }
    console.log("registerAction", data)
    return data
}
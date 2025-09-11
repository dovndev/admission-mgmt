"use server"
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth/auth";
import { PersonalDetailsFormData, validatePersonalDetails } from "@/schemas";
import { EducationalDetailsFormData, EducationalDetailsSchema } from "@/schemas";
import { Branch } from "@/types/userTypes";


export async function personalDetailsAction(data: PersonalDetailsFormData) {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    try {
        // Validate the input data
        const validatedData = validatePersonalDetails(data);

        // Get current user to check onboarding step
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        // Update user with validated data
        console.log("updating the user data");
        const user = await prisma.user.update({
            where: {
                id: session.user.id

            },
            data: {
                firstName: validatedData.firstName,
                middleName: validatedData.middleName,
                lastName: validatedData.lastName,
                mobileNumber: validatedData.mobileNumber,
                keralaMobileNumber: validatedData.keralaMobileNumber,
                dob: new Date(validatedData.dob), // Convert string to Date
                photo: validatedData.photo,
                contactAddress: {
                    set: {
                        ...validatedData.contactAddress,
                        pincode: parseInt(validatedData.contactAddress.pincode)
                    }
                },
                permanentAddress: {
                    set: {
                        ...validatedData.permanentAddress,
                        pincode: parseInt(validatedData.permanentAddress.pincode)
                    }
                },
                parentDetails: {
                    set: validatedData.parentDetails
                },
                onboardingStep: Math.max(1, currentUser?.onboardingStep || 0) // Set to step 1 if not already higher
            }
        });

        return {
            success: true,
            message: "Personal details saved successfully",
            user
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to save data: ${error.message}`);
        }
        throw new Error("Failed to save data");
    }
}

export async function updateEducationDetails(data: EducationalDetailsFormData) {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    try {
        // Validate the input data
        const validatedData = EducationalDetailsSchema.parse(data);

        // Get current user to check onboarding step
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        // Update user education details
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                education: {
                    set: {
                        tenth: {
                            schoolName: validatedData._10thSchool,
                            board: validatedData._10thBoard,
                            markList: validatedData._10thMarklist,
                        },
                        twelfth: {
                            schoolName: validatedData._12thSchool,
                            board: validatedData._12thBoard,
                            markList: validatedData._12thMarklist,
                        },
                        keam: {
                            year: parseInt(validatedData.KeamYear || "0"),
                            rollNumber: parseInt(validatedData.KeamRollNo || "0"),
                            rank: parseInt(validatedData.KeamRank || "0"),
                            paper1Mark: parseInt(validatedData.PaperOneScore || "0"),
                            paper2Mark: parseInt(validatedData.PaperTwoScore || "0"),
                            totalScore: parseInt(validatedData.KeamScore || "0"),
                            markList: validatedData.KeamMarklist,
                        }
                    }
                },
                onboardingStep: Math.max(2, currentUser?.onboardingStep || 0) // Set to step 2 if not already higher
            }
        });

        return {
            success: true,
            message: "Educational details saved successfully",
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to save educational details: ${error.message}`);
        }
        throw new Error("Failed to save educational details");
    }
}

export async function updateDeclerationDetails(data: {
    branch: Branch,
    signature: string,
    signatureGuardian: string,

}) {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    try {
        // Validate the input data
        const validatedData = data; // Assuming data is already validated

        // Get current user to check onboarding step
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        // Update user declaration details
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                declaration: {
                    set: {
                        branch: validatedData.branch,
                        signature: validatedData.signature,
                        signatureGuardian: validatedData.signatureGuardian
                    }
                },
                onboardingStep: Math.max(3, currentUser?.onboardingStep || 0) // Set to step 3 if not already higher
            }
        });

        return {
            success: true,
            message: "Declaration details saved successfully",
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to save declaration details: ${error.message}`);
        }
        throw new Error("Failed to save declaration details");
    }

}

export async function updatePaymentDetails(data: {
    transactionId: string,
    transactionSlip: string,
}) {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    try {
        // Validate the input data
        const validatedData = data; // Assuming data is already validated

        // Get current user to check onboarding step
        const currentUser = await prisma.user.findUnique({
            where: { id: session.user.id }
        });

        // Update user payment details
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                payment: {
                    set: {
                        transactionNumber: validatedData.transactionId,
                        transactionSlip: validatedData.transactionSlip
                    }
                },
                onboardingStep: Math.max(4, currentUser?.onboardingStep || 0) // Set to step 4 (completed) if not already higher
            }
        });

        return {
            success: true,
            message: "Payment details saved successfully",
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to save payment details: ${error.message}`);
        }
        throw new Error("Failed to save payment details");
    }

}
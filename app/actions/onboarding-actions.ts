"use server"
import { prisma } from "@/prisma/prisma";
import { auth } from "@/auth/auth";
import { PersonalDetailsFormData, validatePersonalDetails } from "@/schemas";


export async function personalDetailsAction(data: PersonalDetailsFormData) {
    const session = await auth();
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }

    try {
        // Validate the input data
        const validatedData = validatePersonalDetails(data);


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
                }
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
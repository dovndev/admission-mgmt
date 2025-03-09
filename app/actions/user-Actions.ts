"use server"
import { prisma } from "@/prisma/prisma"

export async function getStructuredUserData(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error("User not found")
    }
    const structuredUser = {
        "Student Details": {
            "Name": `${user.firstName} ${user.middleName} ${user.lastName}`,
            "Religion": user.religion,
            'Date of Birth': user.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided',
            'Geneder': user.gender,
            'Aadhaar No': user.aadharNo,
            'Phone': user.mobileNumber,
            'Kerala Phone': user.keralaMobileNumber,
            'Email': user.email,
            'Parent Name': user.parentDetails?.guardian,
            'Parent Occupation': user.parentDetails?.occupation,
            'Quota': user.quota,
            'Course': user.program,
            'Academic Year': user.applyingYear,
            'NRI Sponsor': user.parentDetails?.sponsor,
            'Relationship with Applicant': user.parentDetails?.relation,
        },
        "Contact Address": {
            "House Name": user.contactAddress?.houseName,
            "State": user.contactAddress?.state,
            "District, City": `${user.contactAddress?.district}, ${user.contactAddress?.city}`,
            "Pin": user.contactAddress?.pincode,
        },
        "Permanent Address": {
            "House Name": user.permanentAddress?.houseName,
            "State": user.permanentAddress?.state,
            "District, City": `${user.permanentAddress?.district}, ${user.permanentAddress?.city}`,
            "Pin": user.permanentAddress?.pincode,
        },
        "10th Mark Details": { "Name of Institution": user.education?.tenth.schoolName, "Board": user.education?.tenth.board },
        "12th Mark Details": { "Name of Institution": user.education?.twelfth.schoolName, "Board": user.education?.twelfth.board },
        "Keam Details": {
            "Year": user.education?.keam?.year,
            "Roll No": user.education?.keam?.rollNumber,
            "Rank": user.education?.keam?.rank,
            "Paper 1 score(Physics and Chemistry)": user.education?.keam?.paper1Mark,
            "Paper 2 score(Mathematics)": user.education?.keam?.paper2Mark,
            "Total Keam Score": user.education?.keam?.totalScore,
        },
        "Branch Details": {
            "Branch": user.declaration?.branch,
        },
        "Uploads": {
            "studentPhoto": user.photo || "/no_img.png",
            "studentSignature": user.declaration?.signature || "/no_img.png",
            "parentSignature": user.declaration?.signatureGuardian || "/no_img.png",
            "tenthCertificate": user.education?.tenth?.markList || "/no_img.png",
            "twelfthCertificate": user.education?.twelfth?.markList || "/no_img.png",
            "keamCertificate": user.education?.keam?.markList || "/no_img.png"
        }
    }
    return structuredUser;
}

export async function conformSeat(userId: string, quota: string, branchName: string, year: number) {
    try {
        const branch = await prisma.branches.findUnique({
            where: {
                name_year: {
                    name: branchName,
                    year: year
                }
            }
        });

        if (!branch) {
            return { success: false, message: "Branch not found" };
        }

        if (branch.totalSets == branch.occupiedSets) {
            return { success: false, message: "No seats available" };
        }

        let quotaField: 'nri' | 'oci' | 'cwig';
        let studentsField: 'nriStudents' | 'ociStudents' | 'cwigStudents';

        switch (quota) {
            case 'NRI':
                quotaField = 'nri';
                studentsField = 'nriStudents';
                break;
            case 'OCI':
                quotaField = 'oci';
                studentsField = 'ociStudents';
                break;
            case 'CIWG':
                quotaField = 'cwig';
                studentsField = 'cwigStudents';
                break;
            default:
                return { success: false, message: "Invalid quota type" };
        }

        await prisma.branches.update({
            where: {
                name_year: {
                    name: branchName,
                    year: year
                }
            },
            data: {
                occupiedSets: branch.occupiedSets + 1,
                //incremetn the quota field
                [quotaField]: { increment: 1 },
                // Add student ID to the appropriate array
                [studentsField]: { push: userId }
            }
        });
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                seatConfirmed: true,
            }
        });
        if (!user) {
            return { success: false, message: "User not found" };
        }


        return { success: true, message: "Seat confirmed successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Seat confirmation failed" };
    }

}
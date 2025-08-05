"use server"
import { prisma } from "@/prisma/prisma"
import { QUOTA_OPTIONS } from "../constants/dropdownOptions";

export async function getStructuredUserData(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!user) {
        throw new Error("User not found")
    }
    const structuredUser = {
        applicationNo: user.applicationNo,
        canOnboard: user.canOnboard,
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
            'Seat Confirmed': user.seatConfirmed,
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
            "District, City": `${user.permanentAddress?.district}, ${user.permanentAddress?.city}`,//if there is not city and district its undefined, undefined
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
            "studentPhoto": user.photo,
            "studentSignature": user.declaration?.signature,
            "parentSignature": user.declaration?.signatureGuardian,
            "tenthCertificate": user.education?.tenth?.markList,
            "twelfthCertificate": user.education?.twelfth?.markList,
            "keamCertificate": user.education?.keam?.markList
        },
        "Payment": {
            "Transaction Number": user.payment?.transactionNumber,
            "Transaction Slip": user.payment?.transactionSlip
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



        if (!QUOTA_OPTIONS.includes(quota)) {
            return { success: false, message: "Invalid quota" };
        }

        const quotaField = quota.toLowerCase();

        const studentsField = `${quotaField}Students`;

        await prisma.branches.update({
            where: {
                name_year: {
                    name: branchName,
                    year: year
                }
            },
            data: {
                occupiedSets: branch.occupiedSets + 1,
                occupiedNri: quota == 'NRI' ? branch.occupiedNri + 1 : branch.occupiedNri,
                occupiedSuper: quota != 'NRI' ? branch.occupiedSuper + 1 : branch.occupiedSuper,
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

export async function getStructuredUsersByYear(year: string, page: number = 1, limit: number = 10) {
    try {
        // Validate input
        if (!year) {
            return {
                success: false,
                message: "Year is required",
                users: [],
                totalUsers: 0,
                totalPages: 0
            };
        }

        // Calculate pagination values
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const totalUsers = await prisma.user.count({
            where: {
                applyingYear: year
            }
        });

        // Get users for the specified year
        const users = await prisma.user.findMany({
            where: {
                applyingYear: year
            },
            orderBy: {
                createdAt: 'desc'
            },
            skip: skip,
            take: limit
        });

        // Format each user with the same structure as getStructuredUserData
        const structuredUsers = users.map(user => ({
            id: user.id,
            applicationNo: user.applicationNo,
            canOnboard: user.canOnboard,
            "Student Details": {
                "Name": `${user.firstName} ${user.middleName || ''} ${user.lastName}`,
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
                'Seat Confirmed': user.seatConfirmed ? 'Yes' : 'No',
            },
            "Contact Address": {
                "House Name": user.contactAddress?.houseName,
                "State": user.contactAddress?.state,
                "District, City": `${user.contactAddress?.district || ''}, ${user.contactAddress?.city || ''}`,
                "Pin": user.contactAddress?.pincode,
            },
            "Permanent Address": {
                "House Name": user.permanentAddress?.houseName,
                "State": user.permanentAddress?.state,
                "District, City": `${user.permanentAddress?.district || ''}, ${user.permanentAddress?.city || ''}`,
                "Pin": user.permanentAddress?.pincode,
            },
            "10th Mark Details": {
                "Name of Institution": user.education?.tenth?.schoolName,
                "Board": user.education?.tenth?.board
            },
            "12th Mark Details": {
                "Name of Institution": user.education?.twelfth?.schoolName,
                "Board": user.education?.twelfth?.board
            },
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
                "studentPhoto": user.photo,
                "studentSignature": user.declaration?.signature,
                "parentSignature": user.declaration?.signatureGuardian,
                "tenthCertificate": user.education?.tenth?.markList,
                "twelfthCertificate": user.education?.twelfth?.markList,
                "keamCertificate": user.education?.keam?.markList
            },
            "Payment": {
                "Transaction Number": user.payment?.transactionNumber,
                "Transaction Slip": user.payment?.transactionSlip
            }
        }));

        return {
            success: true,
            users: structuredUsers,
            totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            currentPage: page,
            message: structuredUsers.length > 0 ?
                `Found ${structuredUsers.length} users for academic year ${year}` :
                `No users found for academic year ${year}`
        };
    } catch (error) {
        console.error("Error fetching users by year:", error);
        return {
            success: false,
            message: `Failed to fetch users: ${error instanceof Error ? error.message : "Unknown error"}`,
            users: [],
            totalUsers: 0,
            totalPages: 0
        };
    }
}

export async function updateOnboardingStatus(userId: string, canOnboard: boolean) {
    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { canOnboard }
        });
        return { success: true, message: "User onboarding status updated successfully", user };
    } catch (error) {
        console.error("Error updating onboarding status:", error);
        return { success: false, message: "Failed to update onboarding status" };
    }
}

export async function deleteStudentById(userId: string) {
    try {
        // First, check if the user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!existingUser) {
            return { 
                success: false, 
                message: "Student not found" 
            };
        }

        // If the user has a confirmed seat, we need to free up the seat in the branch
        if (existingUser.seatConfirmed && existingUser.declaration?.branch) {
            const branchName = existingUser.declaration.branch;
            const year = parseInt(existingUser.applyingYear);
            const quota = existingUser.quota.toLowerCase();

            // Find the branch
            const branch = await prisma.branches.findUnique({
                where: {
                    name_year: {
                        name: branchName,
                        year: year
                    }
                }
            });

            if (branch) {
                // Determine which fields to update based on quota
                const occupiedField = quota === 'nri' ? 'occupiedNri' : 
                                   quota === 'oci' ? 'occupiedNri' : // OCI uses NRI seats
                                   'occupiedSuper'; // CWIG uses super seats

                const studentsField = `${quota}Students` as 'nriStudents' | 'ociStudents' | 'cwigStudents';

                // Get current occupied count
                const currentOccupied = occupiedField === 'occupiedNri' ? branch.occupiedNri : branch.occupiedSuper;
                
                // Get current students array
                const currentStudents = studentsField === 'nriStudents' ? branch.nriStudents :
                                      studentsField === 'ociStudents' ? branch.ociStudents :
                                      branch.cwigStudents;

                // Update branch seat allocation
                await prisma.branches.update({
                    where: {
                        name_year: {
                            name: branchName,
                            year: year
                        }
                    },
                    data: {
                        occupiedSets: branch.occupiedSets - 1,
                        [occupiedField]: Math.max(0, currentOccupied - 1),
                        // Remove student ID from the appropriate array
                        [studentsField]: {
                            set: currentStudents.filter(id => id !== userId)
                        }
                    }
                });
            }
        }

        // Delete the user
        await prisma.user.delete({
            where: { id: userId }
        });

        return { 
            success: true, 
            message: "Student deleted successfully" 
        };

    } catch (error) {
        console.error("Error deleting student:", error);
        return { 
            success: false, 
            message: `Failed to delete student: ${error instanceof Error ? error.message : "Unknown error"}` 
        };
    }
}
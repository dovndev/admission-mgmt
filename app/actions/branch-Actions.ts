"use server";

import { prisma } from "@/prisma/prisma";
import { BRANCH_OPTIONS } from "../constants/dropdownOptions";

const branchesList = BRANCH_OPTIONS
interface BranchData {
    mngtSeats: number;
    nriSeats: number;
    superSeats: number;
    waitingList: number;
}


export async function addYear(year: number) {
    const existingBranch = await prisma.branches.findFirst({
        where: {
            year: year
        }
    });

    if (existingBranch) {
        throw new Error(`A branch for the year ${year} already exists`);
    }

    // Create year status record (default to active)
    await prisma.yearStatus.upsert({
        where: { year },
        update: {}, // No update needed if exists
        create: {
            year,
            isActive: true
        }
    });

    const newBranch = await Promise.all(branchesList.map(async (branchName) => {
        const superSeats = 9;
        const nriSeats = 9;
        const mngtSeats = 9;
        const totalSeats = superSeats + nriSeats + mngtSeats;
        return await prisma.branches.create({
            data: {
                name: branchName,
                year: year,
                superSeats: superSeats,
                nriSeats: nriSeats,
                mngtSeats: mngtSeats,
                totalSets: totalSeats,  // Sum of all seat types
                occupiedSets: 0,
                occupiedNri: 0,
                occupiedMngt: 0,
                occupiedSuper: 0,
                nri: 0,
                oci: 0,
                cwig: 0,
                waitingList: 0
            }
        })
    }))
    return {
        success: true,
        message: "Branch added successfully",
        branch: newBranch
    }
}
export async function getAllBreanchesByYear() {
    const branches = await prisma.branches.findMany({
        select: {
            year: true,
            name: true,
            mngtSeats: true,
            nriSeats: true,
            superSeats: true,
            waitingList: true
        },
        orderBy: {
            year: 'desc'
        }
    });

    // Transform flat array into object grouped by year
    const groupedByYear = branches.reduce((acc, branch) => {
        // If this year doesn't exist in our accumulator yet, create it
        if (!acc[branch.year]) {
            acc[branch.year] = {};
        }

        // Add this branch data under its name
        acc[branch.year][branch.name] = {
            mngtSeats: branch.mngtSeats,
            nriSeats: branch.nriSeats,
            superSeats: branch.superSeats,
            waitingList: branch.waitingList
        };

        return acc;
    }, {} as Record<number, Record<string, BranchData>>);

    return groupedByYear;
}


export async function isBranchAvailable(year: number | string, branch: string) {
    // console.log("year", year, "branch", branch)
    if (typeof year === "string") {
        year = parseInt(year)
    }
    const branchEntry = await prisma.branches.findFirst({
        where: {
            year: year,
            name: branch
        }
    });
    if (!branch) {
        throw new Error(`Branch ${branch} not found for the year ${year}`);
    }
    return branchEntry;
}

// Year activation functions
export async function toggleYearActivation(year: number, isActive: boolean) {
    try {
        // First check if year status exists
        const existingStatus = await prisma.yearStatus.findUnique({
            where: { year }
        });

        if (existingStatus) {
            // Update existing status
            const updatedStatus = await prisma.yearStatus.update({
                where: { year },
                data: { isActive }
            });
            return {
                success: true,
                message: `Year ${year} ${isActive ? 'activated' : 'deactivated'} successfully`,
                status: updatedStatus
            };
        } else {
            // Create new status entry
            const newStatus = await prisma.yearStatus.create({
                data: {
                    year,
                    isActive
                }
            });
            return {
                success: true,
                message: `Year ${year} ${isActive ? 'activated' : 'deactivated'} successfully`,
                status: newStatus
            };
        }
    } catch (error) {
        console.error("Error toggling year activation:", error);
        return {
            success: false,
            message: `Failed to ${isActive ? 'activate' : 'deactivate'} year ${year}`
        };
    }
}

export async function getYearActivationStatus(year: number) {
    try {
        const yearStatus = await prisma.yearStatus.findUnique({
            where: { year }
        });
        
        // If no record exists, default to active (true)
        return {
            success: true,
            isActive: yearStatus?.isActive ?? true,
            year
        };
    } catch (error) {
        console.error("Error getting year activation status:", error);
        return {
            success: false,
            isActive: false,
            year
        };
    }
}
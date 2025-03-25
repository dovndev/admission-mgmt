"use server";

import { prisma } from "@/prisma/prisma";

const branchesList = ["CSE", "EEE", "CSAI", "ECE", "CE", "ME", "AIDS", "CY"];
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
"use server";

import { prisma } from "@/prisma/prisma";

const branchesList = ["CSE", "EEE", "CSAI", "ECE", "CE", "ME", "AIDS", "CY"];

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
        return await prisma.branches.create({
            data: {
                name: branchName,
                year: year,
                totalSets: 9,
                occupiedSets: 0,
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

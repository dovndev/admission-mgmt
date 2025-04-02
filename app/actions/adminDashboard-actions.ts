'use server'

import { prisma } from "@/prisma/prisma";
import { Branch } from "@prisma/client";

export async function getDashboardStats(year: number) {
    try {
        // Get all branches for the specified year
        const branches = await prisma.branches.findMany({
            where: { year },
        });

        // Get user applications stats for the specified year
        const users = await prisma.user.findMany({
            where: {
                applyingYear: year.toString(),
            },
        });

        // Initialize all branches from the Branch enum with zero values
        const allBranches: Record<string, { applications: number; approved: number }> = {
            CSE: { applications: 0, approved: 0 },
            ECE: { applications: 0, approved: 0 },
            EEE: { applications: 0, approved: 0 },
            ME: { applications: 0, approved: 0 },
            CE: { applications: 0, approved: 0 },
            IT: { applications: 0, approved: 0 },
        };

        // Count applications by branch
        users.forEach(user => {
            const branchName = user.declaration?.branch;
            if (branchName && branchName in allBranches) {
                allBranches[branchName].applications += 1;
                if (user.canOnboard) {
                    allBranches[branchName].approved += 1;
                }
            }
        });

        // Format branch data for chart - include all branches
        const programData = Object.entries(allBranches).map(
            ([program, stats]) => ({
                program,
                applications: stats.applications,
                approved: stats.approved,
            })
        );

        // Count applications by quota
        const quotaData = [
            {
                quota: "NRI",
                applications: users.filter(user => user.quota === "NRI").length
            },
            {
                quota: "OCI",
                applications: users.filter(user => user.quota === "OCI").length
            },
            {
                quota: "CIWG",
                applications: users.filter(user => user.quota === "CIWG").length
            },
        ];

        // Calculate totals
        const totalApplications = users.length;
        const totalApproved = users.filter((user) => user.canOnboard).length;

        return {
            programData,
            quotaData,
            totalApplications,
            totalApproved,
            success: true,
        };
    } catch (error) {
        console.error("Error getting dashboard stats:", error);
        return {
            programData: [],
            quotaData: [],
            totalApplications: 0,
            totalApproved: 0,
            success: false,
            error: "Failed to fetch dashboard statistics",
        };
    }
}

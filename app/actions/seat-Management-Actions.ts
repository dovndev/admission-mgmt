"use server"

import { prisma } from "@/prisma/prisma";

export async function getAllAvailableYears() {
    const years = await prisma.branches.findMany({
        select: {
            year: true
        },
        distinct: ['year']
    });

    // Extract the year values from the result
    const availableYears = years.map(item => item.year);

    // Sort the years in ascending or descending order
    availableYears.sort((a, b) => b - a); // Descending order (most recent first)

    return availableYears;
}
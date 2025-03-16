import { prisma } from "@/prisma/prisma";

export async function getUserByID(id: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return user
}


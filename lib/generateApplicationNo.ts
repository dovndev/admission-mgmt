import { prisma } from "@/prisma/prisma";
import { Quota, Program } from "@prisma/client"

export async function generateApplicationNo(quota: Quota, program: Program, applyingYear: string): Promise<string> {
  const yearShort = applyingYear.slice(-2);
  const quotaLetter = quota.charAt(0).toUpperCase();
  const programShort = program.slice(0,2).toUpperCase();

  const lastApplication = await prisma.user.findFirst({
    where: {
      quota: quota,
      program: program,
      applyingYear: applyingYear,
    },
    orderBy: {
      applicationNo: "desc",
    },
  });

  const count = lastApplication ? parseInt(lastApplication.applicationNo.slice(-4)) : 0;

  const sequence = String(count + 1).padStart(4, "0");

  return `${quotaLetter}${programShort}${yearShort}${sequence}`;
}

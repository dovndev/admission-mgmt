import { prisma } from "@/prisma/prisma";
import { Quota, Program } from "@prisma/client"

export async function generateApplicationNo(quota: Quota, program: Program, applyingYear: string): Promise<string> {
  const yearShort = applyingYear.slice(-2);
  const quotaLetter = quota.charAt(0).toUpperCase();
  const programShort = program.slice(0,2).toUpperCase();

  const count = await prisma.user.count({
    where: {
      quota: quota,
      program: program,
      applyingYear: applyingYear,
    },
  });

  const sequence = String(count + 1).padStart(4, "0");

  return `${quotaLetter}${programShort}${yearShort}${sequence}`;
}

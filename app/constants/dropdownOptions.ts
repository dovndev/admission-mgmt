import { Branch, Quota, Program } from "../../prisma/branchTypes"; // Adjust the import path as necessary

type NonEmptyArray<T> = [T, ...T[]];

export const GENDER_OPTIONS: NonEmptyArray<string> = ["Male", "Female", "Other"];

// Use the Prisma enum values
export const QUOTA_OPTIONS: NonEmptyArray<string> = Object.values(Quota) as NonEmptyArray<string>;

// Use the Prisma enum values
export const PROGRAM_OPTIONS: NonEmptyArray<string> = Object.values(Program) as NonEmptyArray<string>;

export const _12TH_BOARD: NonEmptyArray<string> = ["CBSE", "ICSE", "STATE"];

export const _10TH_BOARD: NonEmptyArray<string> = ["CBSE", "ICSE", "STATE"];

export const REGISTER_STEPS: NonEmptyArray<string> = [
  "Personal Details",
  "Educational Details",
  "Declaration",
  "Final Verification",
  "Payment",
];

export const RELIGIONS: NonEmptyArray<string> = [""];

// Use the Prisma enum values
export const BRANCH_OPTIONS: NonEmptyArray<string> = Object.values(Branch) as NonEmptyArray<string>;

// Use the Branch type from Prisma
export type BranchCodeType = Branch;
export type QuotaCodeType = "NRI" | "CIWG" | "OCI" | "PIO";
export type ProgramCodeType = "BTech" | "MCA" | "MTech";

export const BANK_ACCOUNT = {
  name: "Muthoot M George Institute of Technology",
  address: "Varikoli, Puthencruz - 682308",
  phone: "0484-2732100",
  bank: "FEDERAL BANK",
  "bank address": "PUTHENCRUZ",
  branch: "Puthencruz",
  "branch phone": "0484-2731259",
  IFSC: "FDRL0001223",
  MICR: "682049055",
  "account number": "12230200217387",
};

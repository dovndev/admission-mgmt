import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dbConnect from "./db";
import userModel from "@/models/user";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generatePassword(userData: {
  firstName: string;
  lastName: string;
  mobileNumber: string;
}): string {
  // Get base parts
  const firstNamePart = userData.firstName.slice(0, 2);
  const lastNamePart = userData.lastName.slice(0, 2);
  const mobileNumberPart = userData.mobileNumber.slice(-4);

  // Add complexity elements
  const timestamp = Date.now().toString(36);
  const symbols = '!@#$%^&*';
  const randomSymbols = Array(2)
    .fill(0)
    .map(() => symbols[Math.floor(Math.random() * symbols.length)])
    .join('');

  // Mix case sensitivity
  const mixCase = (str: string) =>
    str.split('').map(char =>
      Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
    ).join('');

  // Combine all parts
  const parts = [
    mixCase(firstNamePart),
    mixCase(lastNamePart),
    mobileNumberPart,
    randomSymbols,
    timestamp.slice(-3)
  ];

  // Shuffle array
  const shuffled = parts
    .join('')
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return shuffled;
}

export async function isUserValid(email: string, password: string) {
  dbConnect()
  const user = userModel.findOne({ email: email });
  console.log("user valid", user)
}
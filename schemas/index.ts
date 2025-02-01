import { z } from "zod";

export const userRegisterSchema = z.object({
    firstName: z.string().min(1, "Please provide a name").max(60, "Name cannot be more than 60 characters"),
    middleName: z.string().min(1, "Please provide a name").max(60, "Name cannot be more than 60 characters"),
    lastName: z.string().max(60, "Name cannot be more than 60 characters").optional(),
    email: z.string().email("Please provide a valid email"),
    mobileNumber: z.string().min(10, "Please provide a valid mobile number").max(10, "Please provide a valid mobile number"),
    gender: z.string().min(1, "Please provide a gender"),
    dob: z.string().min(1, "Please provide a date of birth"),
    applyingYear: z.string().min(4, "Please provide an valid applying year"),
    quota: z.enum(["NRI", "CWIG"]).refine(val => val, { message: "Please select a valid quota" }),
    program: z.enum(["BTech", "MCA", "MTech"]).refine(val => val, { message: "Please select a valid program" }),
    aadharNo: z.string().min(12, "Please provide a valid aadhar number").max(12, "Please provide a valid aadhar number"),
    religion: z.string().min(1, "Please provide a religion"),
    cast: z.string().min(1, "Please provide a cast"),
});

export const userLoginSchema = z.object({
    email: z.string().email("Please provide a valid email"),
    password: z.string().min(8, "Password must be atleast 8 characters"),
});



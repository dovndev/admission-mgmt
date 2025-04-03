import { BranchCodeType,QuotaCodeType,ProgramCodeType } from '@/app/constants/dropdownOptions';
import { Document } from 'mongoose';

export type Branch = BranchCodeType;
export type Quota = QuotaCodeType;
export type Program = ProgramCodeType;



export interface IEducation {
    tenth: {
        schoolName: string;
        board: string;
        markList: string;
    };
    twelfth: {
        schoolName: string;
        board: string;
        markList: string;
    };
    keam?: {
        year: number;
        rollNumber: number;
        rank: number;
        paper1Mark: number;
        paper2Mark: number;
        totalScore: number;
        markList: string;
    };
}

export interface IDeclaration {
    branch: Branch;
    signature: string;
    signatureGuardian: string;
}

export interface IPayment {
    transactionNumber: number;
    transactionSlip: string;
}

export interface IUserAddress {
    houseName: string;
    state: string;
    district: string;
    pincode: number;
    city: string;
}

export interface IParentDetails {
    guardian: string;
    occupation: string;
    sponsor: string;
    relation: string;
}

export interface IpersonalDetails {
    firstName: string;
    middleName: string;
    lastName?: string;
    email: string;
    password: string;
    mobileNumber: number;
    keralaMobileNumber?: number;
    gender: string;
    quota: Quota;
    program: Program;
    applyingYear: number;
    aadharNo: number;
    dob: Date;
    religion: string;
    cast: string;
    contactAddress?: IUserAddress;
    permanentAddress?: IUserAddress;
    parentDetails?: IParentDetails;
}

export interface IUser extends Document {
    personalDetails: IpersonalDetails;
    education?: IEducation;
    declaration?: IDeclaration;
    payment?: IPayment;
    createdAt: Date;
    generateHashPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

type StructuredUserData = {
    "Student Details": Record<string, any>;
    "Contact Address": Record<string, any>;
    "Permanent Address": Record<string, any>;
    "10th Mark Details": Record<string, any>;
    "12th Mark Details": Record<string, any>;
    "Keam Details": Record<string, any>;
    "Branch Details": Record<string, any>;
    "Uploads": Record<string, string | null | undefined>;
    [key: string]: any;
}
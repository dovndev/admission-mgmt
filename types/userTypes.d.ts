import { Document } from 'mongoose';

export type Branch = "CSE" | "ECE" | "EEE" | "ME" | "CE" | "IT";
export type Quota = "NRI" | "CWIG";
export type Program = "BTech" | "MCA" | "MTech";

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
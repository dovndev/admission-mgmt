import { Document } from 'mongoose';

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
    branch: "CSE" | "ECE" | "EEE" | "ME" | "CE" | "IT";
    signature: string;
    signatureGuardian: string;
}

export interface IPayment {
    transactionNumber: number;
    transactionSlip: string;
}

export interface IPersonalDetails {
    firstName: string;
    middleName: string;
    lastName?: string;
    email: string;
    password: string;
    mobileNumber: number;
    keralaMobileNumber?: number;
    gender: string;
    quota: "NRI" | "CWIG";
    program: "BTech" | "MCA" | "MTech";
    applyingYear: number;
    aadharNo: number;
    dob: Date;
    religion: string;
    cast: string;
}

export interface IUser extends Document {
    personalDetails: IPersonalDetails;
    education?: IEducation;
    declaration?: IDeclaration;
    payment?: IPayment;
    createdAt: Date;
    generateHashPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}
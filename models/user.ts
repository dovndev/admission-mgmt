import mongoose from "mongoose";
import { compare, genSalt, hash } from "bcrypt";

const EducationSchema = new mongoose.Schema({
    tenth: {
        schoolName: {
            type: String,
            required: [true, "Please provide a school name"],
        },
        board: {
            type: String,
            required: [true, "Please provide a board"],
        },
        markList: {
            type: String,
            required: [true, "Please provide the mark list url"],
        },
    },
    twelfth: {
        schoolName: {
            type: String,
            required: [true, "Please provide a school name"],
        },
        board: {
            type: String,
            required: [true, "Please provide a board"],
        },
        markList: {
            type: String,
            required: [true, "Please provide the mark list url"],
        },
    },
    keam: {
        year: {
            type: Number,
            required: [true, "Please provide a year"],
        },
        rollNumber: {
            type: Number,
            required: [true, "Please provide a roll number"],
        },
        rank: {
            type: Number,
            required: [true, "Please provide a rank"],
        },
        paper1Mark: {
            type: Number,
            required: [true, "Please provide a mark"],
        },
        paper2Mark: {
            type: Number,
            required: [true, "Please provide a mark"],
        },
        totalScore: {
            type: Number,
            required: [true, "Please provide a score"],
        },
        markList: {
            type: String,
            required: [true, "Please provide the mark list url"],
        },
    },
});

const DeclarationSchema = new mongoose.Schema({
    branch: {
        type: String,
        enum: {
            values: ["CSE", "ECE", "EEE", "ME", "CE", "IT"],
            message: "Please select a valid branch",
        },
    },
    signature: {
        type: String,
        required: [true, "Please provide a signature"],
    },
    signatureGuardian: {
        type: String,
        required: [true, "Please provide a signature"],
    },
});

const PaymentSchema = new mongoose.Schema({
    transactionNumber: {
        type: Number,
        required: [true, "Please provide a transaction number"],
    },
    transactionSlip: {
        type: String,
        required: [true, "Please provide a transaction slip"],
    },
});

const UserAddressSchema = new mongoose.Schema({
    houseName: {
        type: String,
        required: [true, "Please provide a house name"],
    },
    state: {
        type: String,
        required: [true, "Please provide a state"],
    },
    district: {
        type: String,
        required: [true, "Please provide a district"],
    },
    pincode: {
        type: Number,
        required: [true, "Please provide a pincode"],
    },
    city: {
        type: String,
        required: [true, "Please provide a city"],
    },
});

const parentDetailsSchema = new mongoose.Schema({
    guardian: {
        type: String,
        required: [true, "Please provide a guardian"],
    },
    occupation: {
        type: String,
        required: [true, "Please provide an occupation"],
    },
    sponsor: {
        type: String,
        required: [true, "Please provide a sponsor"],
    },
    relation: {
        type: String,
        required: [true, "Please provide a relation"],
    },
});

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    middleName: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    lastName: {
        type: String,
        maxlength: [60, "Name cannot be more than 60 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        select: false,
        unique: true,
    },
    mobileNumber: {
        type: Number,
        required: [true, "Please provide a mobile number"],
        unique: true,
    },
    keralaMobileNumber: {
        type: Number,
        unique: true,
    },
    gender: {
        type: String,
        required: [true, "Please provide a gender"],
    },
    quota: {
        type: String,
        required: [true, "Please provide an application type"],
        enum: {
            values: ["NRI", "CWIG"],
            message: "Please select a valid quota",
        },
    },
    program: {
        type: String,
        required: [true, "Please provide an applying type"],
        enum: {
            values: ["BTech", "MCA", "MTech"],
            message: "Please select a valid program",
        },
    },
    applyingYear: {
        type: Number,
        required: [true, "Please provide an applying year"],
    },
    aadharNo: {
        type: Number,
        required: [true, "Please provide an aadhar number"],
        unique: true,
    },
    dob: {
        type: Date,
        required: [true, "Please provide a date of birth"],
    },
    religion: {
        type: String,
        required: [true, "Please provide a religion"],
    },
    cast: {
        type: String,
        required: [true, "Please provide a cast"],
    },
    contactAddress: {
        type: UserAddressSchema,
        required: false,
    },
    permanentAddress: {
        type: UserAddressSchema,
        required: false,
    },
    parentDetails: {
        type: parentDetailsSchema,
        required: false,
    },
    education: {
        type: EducationSchema,
        required: false,
    },
    declaration: {
        type: DeclarationSchema,
        required: false,
    },
    payment: {
        type: PaymentSchema,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

UserSchema.methods.generateHashPassword = async function (password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

UserSchema.methods.validatePassword = async function (
    password: string
): Promise<boolean> {
    return compare(password, this.password);
};


const userModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default userModel;


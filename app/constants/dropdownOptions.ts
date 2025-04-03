type NonEmptyArray<T> = [T, ...T[]];

export const GENDER_OPTIONS: NonEmptyArray<string> = ["Male", "Female", "Other"];

export const APPLYING_YEAR_OPTIONS: NonEmptyArray<string> = ["2025", "2026"];

export const QUOTA_OPTIONS: NonEmptyArray<string> = ["NRI", "OCI", "CIWG", "PIO"];

export const PROGRAM_OPTIONS: NonEmptyArray<string> = ["BTech", "MTech", "MCA"];

export const _12TH_BOARD: NonEmptyArray<string> = ["CBSE", "ICSE", "STATE"];

export const _10TH_BOARD: NonEmptyArray<string> = ["CBSE", "ICSE", "STATE"];

export const REGISTER_STEPS: NonEmptyArray<string> = [
    "Personal Details",
    "Educational Details",
    "Declaration",
    "Final Verification",
    "Payment"
];

export const RELIGIONS : NonEmptyArray<string> = [
    ""
]

export const BRANCH_OPTIONS: NonEmptyArray<string> = ["CSE", "EEE", "CSAI", "ECE", "CE", "ME", "AIDS", "CY"];

export type BranchCodeType = "CSE" | "ECE" | "ME" | "CE" | "AIDS" | "EEE" | "CSAI" | "CY";

export const BANK_ACCOUNT = {name:"Muthoot M George Institute of Technology" ,address:"Varikoli, Puthencruz - 682308" ,phone:"0484-2732100",bank:"FEDERAL BANK", "bank address":"PUTHENCRUZ", branch:"Puthencruz", "branch phone":"0484-2731259",IFSC:"FDRL0001223" , MICR:"682049055","account number":"12230200217387"}

export const BRANCHES = {
    "CSE": "Computer Science and Engineering",
    "ECE": "Electronics and Communication Engineering",
    "MECH": "Mechanical Engineering",
    "CIVIL": "Civil Engineering",
    "EEE": "Electrical and Electronics Engineering",
    "AI & DS": "Artificial Intelligence & Data Science",
    "CS & CY": "Computer Science and Cyber Security",
    "CSE(AI)": "Computer Science and Engineering(AI)"
}


export const SEAT_ALLOCATION = {
    "CSE": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "ECE": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "EEE": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "MECH": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "CIVIL": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "CSE(A)": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "AI & DS": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "CS & CY": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
    "CSE(AI)": {
        NRI: 9,
        Supernumerary: 9,
        MGMT: 9,
    },
};


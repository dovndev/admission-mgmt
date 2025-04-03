export interface StructuredUserData {
    id: string; // Adding id field which was missing
    applicationNo: string;
    canOnboard: boolean;
    "Student Details": {
        "Name": string;
        "Religion": string;
        "Date of Birth": string;
        "Geneder": string;
        "Aadhaar No": number;
        "Phone": string;
        "Kerala Phone"?: string;
        "Email": string;
        "Parent Name"?: string;
        "Parent Occupation"?: string;
        "Quota": string;
        "Course": string;
        "Academic Year": string;
        "NRI Sponsor"?: string;
        "Relationship with Applicant"?: string;
        "Seat Confirmed": string; // Changed from boolean to string to match 'Yes'/'No' values
        userId?: string;
    };
    "Contact Address"?: {
        "House Name"?: string;
        "State"?: string;
        "District, City"?: string;
        "Pin"?: number;
    };
    "Permanent Address"?: {
        "House Name"?: string;
        "State"?: string;
        "District, City"?: string;
        "Pin"?: number;
    };
    "10th Mark Details"?: {
        "Name of Institution"?: string;
        "Board"?: string;
    };
    "12th Mark Details"?: {
        "Name of Institution"?: string;
        "Board"?: string;
    };
    "Keam Details"?: {
        "Year"?: number;
        "Roll No"?: number;
        "Rank"?: number;
        "Paper 1 score(Physics and Chemistry)"?: number;
        "Paper 2 score(Mathematics)"?: number;
        "Total Keam Score"?: number;
    };
    "Branch Details"?: {
        "Branch"?: string;
    };
    "Uploads"?: {
        "studentPhoto"?: string;
        "studentSignature"?: string;
        "parentSignature"?: string;
        "tenthCertificate"?: string;
        "twelfthCertificate"?: string;
        "keamCertificate"?: string;
    };
    "Payment"?: {
        "Transaction Number"?: number;
        "Transaction Slip"?: string;
    };
}

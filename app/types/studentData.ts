// Filepath: /e:/GitHub/admission-mgmt/app/types/applicationData.ts

export interface DataRow {
  label: string;
  value: string;
}

export interface StudentSection {
  [key: string]: DataRow[];
}

export const STUDENTDATA: StudentSection = {
    "Student Details": [
        { label: "Name", value: "Alan Francis Santhosh" },
        { label: "Date of Birth", value: "2025-01-21" },
        { label: "Gender", value: "Male" },
        { label: "Aadhar", value: "848736823687" },
        { label: "Phone 1", value: "54535568345" },
        { label: "Phone 2", value: "9898475598" },
        { label: "Parent Name", value: "Santhosh" },
        { label: "Parent Occupation", value: "Manager" },
        { label: "Nri Sponsor", value: "Santhosh" },
        { label: "Relationship with applicant", value: "Father" },
    ],
    "Contact Address": [
        { label: "House Name", value: "jillathodical" },
        { label: "State", value: "kerala" },
        { label: "District, City", value: "ernakulam, kochi" },
        { label: "Pin", value: "682507" },
    ],
    "Permanent Address": [
        { label: "House Name", value: "jillathodical" },
        { label: "State", value: "kerala" },
        { label: "District, City", value: "ernakulam, kochi" },
        { label: "Pin", value: "682507" },
    ],
    "10th Mark Details": [
        { label: "Name of Institution", value: "St. Joseph's School" },
    ],
    "12th Mark Details": [
        { label: "Name of Institution", value: "St. Joseph's School" },
    ],
    "Keam Details": [
        { label: "Year", value: "2025" },
        { label: "Roll No", value: "123456" },
        { label: "Rank", value: "1234" },
        { label: "Paper 1 score(Physics and Chemistry)", value: "120" },
        { label: "Paper 2 score(Mathematics)", value: "120" },
        { label: "Total Keam Score", value: "240" },
    ],
    "Branch Details": [
        { label: "Branch Preference", value: "Computer Science" },
    ],
};

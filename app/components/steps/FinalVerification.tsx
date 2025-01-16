"use client";
import { Button, Checkbox, Image } from "@nextui-org/react";
import TableDisplayContent from "../TableDisplayContent";
export default function Register() {
  const applicantData = {
    "Student Details": {
      Name: "Alan Francis Santhosh",
      "Date of Birth": "2025-01-21",
      Gender: "Male",
      Aadhar: "848736823687",
      "Phone 1": "54535568345",
      "Phone 2": "9898475598",
      "Parent Name": "Santhosh",
      "Parent Occupation": "Manager",
      "Nri Sponsor": "Santhosh",
      "Relationship with applicant": "Father",
    },
    "Contact Address": {
      "House Name": "jillathodical",
      State: "kerala",
      "District, City": "ernakulam, kochi",
      Pin: "682507",
    },
    "Permanent Address": {
      "House Name": "jillathodical",
      State: "kerala",
      "District, City": "ernakulam, kochi",
      Pin: "682507",
    },
    "10th Mark Details": {
      "Name of Institution": "St. Joseph's School",
    },
    "12th Mark Details": {
      "Name of Institution": "St. Joseph's School",
    },
    "Keam Details": {
      Year: "2025",
      "Roll No": "123456",
      Rank: "1234",
      "Paper 1 score(Physics and Chemistry)": "120",
      "Paper 2 score(Mathematics)": "120",
      "Total Keam Score": "240",
    },
    "Branch Details": {
      "Branch Preference": "Computer Science",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center justify-center w-full p-3">
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-4xl ">
        <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">Verification</h2>

        {/* Student Profile photo and signature */}
        <div className="flex flex-row justify-between space-x-4">
          <div className="flex flex-col items-center justify-end">
            <Image
              src="/no_img.png"
              alt="Student Photo"
              className="w-full h-full p-2 max-h-[20rem] min-h-[20rem] object-contain rounded-xl"
            />
            <h1 className="text-center">Student Photo</h1>
          </div>
          <div className="flex flex-col items-center justify-end">
            <Image
              src="/no_img.png"
              alt="Signature"
              className="w-full h-full p-2 max-h-[20rem] min-h-[20rem] object-contain rounded-xl"
            />
            <h1 className="text-center">Student Signature</h1>
          </div>
        </div>

        {/* Student Details */}
        <div className="flex flex-col md:flex-row justify-between gap-5 pt-10 pb-2  ">
          {/* Student Details */}
          <div className="flex flex-col w-full">
            <h1 className="text-center font-extrabold">
              Student Details<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Student Data" rows={Object.entries(applicantData["Student Details"])} />
          </div>

          {/* Contact and Permanent Address */}
          <div className="flex flex-col w-full">
            <h1 className="text-center font-extrabold">
              Contact Address<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Student Data" rows={Object.entries(applicantData["Contact Address"])} />
            <h1 className="text-center font-extrabold pt-1">
              Permanent Address<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Address" rows={Object.entries(applicantData["Permanent Address"])} />
          </div>
        </div>

        {/* Mark Details */}
        <div className="flex flex-col md:flex-row justify-between gap-5 pt-10 pb-2  ">
          {/* 10th and 12th mark list */}

          <div className="flex flex-col w-full items-center justify-start">
            <h1 className="text-center font-extrabold">
              10th Mark Details<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="10th Mark Details" rows={Object.entries(applicantData["10th Mark Details"])} />
            <Image
              src="/no_img.png"
              alt="Student Photo"
              className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
            />
          </div>

          <div className="flex flex-col w-full items-center justify-start">
            <h1 className="text-center font-extrabold pt-1">12th Mark Details</h1>
            <TableDisplayContent id="12th Mark Details" rows={Object.entries(applicantData["12th Mark Details"])} />
            <Image
              src="/no_img.png"
              alt="Student Photo"
              className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Keam Details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 pt-10 pb-2  ">
          <div className="w-full ">
            <h1 className="text-center font-extrabold">
              KEAM Details<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Keam Details" rows={Object.entries(applicantData["Keam Details"])} />
          </div>
          <Image
            src="/no_img.png"
            alt="Student Photo"
            className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
          />
        </div>

        {/* Branch Details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 pb-2  ">
          <TableDisplayContent id="Branch Details" rows={Object.entries(applicantData["Branch Details"])} />
        </div>

        {/* Final submit*/}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Checkbox className="" isRequired>
            I hereby declare that all the information furnished above are true and correct and we will obey the rules
            and regulations of the institution if admitted
          </Checkbox>
          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Proceed
          </Button>
        </form>
      </div>
    </div>
  );
}

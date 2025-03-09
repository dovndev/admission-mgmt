"use client";
import { Image } from "@nextui-org/react";
import TableDisplayContent from "./TableDisplayContent";
import { STUDENTDATA as studentData } from "@/app/mock/mockData";

interface StudentDetailsProps {
  studentId?: string;
}

export default function StudentDetails({ studentId }: StudentDetailsProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-3">
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-4xl ">
        <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">
          Details of <span>{studentId} </span>
        </h2>

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
              alt="Transaction Slip"
              className="w-full h-full p-2 max-h-[20rem] min-h-[20rem] object-contain rounded-xl"
            />
            <h1 className="text-center">Transaction Slip</h1>
          </div>
        </div>

        {/* Student Details */}
        <div className="flex flex-col md:flex-row justify-between gap-5 pt-10 pb-2  ">
          {/* Student Details */}
          <div className="flex flex-col w-full">
            <h1 className="text-center font-extrabold">
              Student Details<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Student Data" rows={studentData["Student Details"]} />
          </div>

          {/* Contact and Permanent Address */}
          <div className="flex flex-col w-full">
            <h1 className="text-center font-extrabold">
              Contact Address<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Student Data" rows={studentData["Contact Address"]} />
            <h1 className="text-center font-extrabold pt-1">
              Permanent Address<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Address" rows={studentData["Permanent Address"]} />
          </div>
        </div>

        {/* Mark Details */}
        <div className="flex flex-col md:flex-row justify-between gap-5 pt-10 pb-2  ">
          {/* 10th and 12th mark list */}

          <div className="flex flex-col w-full items-center justify-start">
            <h1 className="text-center font-extrabold">
              10th Mark Details<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="10th Mark Details" rows={studentData["10th Mark Details"]} />
            <Image
              src="/no_img.png"
              alt="Student Photo"
              className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
            />
          </div>

          <div className="flex flex-col w-full items-center justify-start">
            <h1 className="text-center font-extrabold">12th Mark Details</h1>
            <TableDisplayContent id="12th Mark Details" rows={studentData["12th Mark Details"]} />
            <Image
              src="/no_img.png"
              alt="Student Photo"
              className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Keam Details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 pt-2 pb-2  ">
          <div className="w-full ">
            <h1 className="text-center font-extrabold">
              KEAM Details<span className="text-muthootRed">*</span>
            </h1>
            <TableDisplayContent id="Keam Details" rows={studentData["Keam Details"]} />
          </div>
          <Image
            src="/no_img.png"
            alt="Student Photo"
            className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col items-center justify-end">
            <h1 className="text-center font-extrabold">Student Signature</h1>
            <Image
              src="/no_img.png"
              alt="Student Signature"
              className="w-full h-full p-2 max-h-[20rem] min-h-[20rem] object-contain rounded-xl"
            />
          </div>
          <div className="flex flex-col items-center justify-end">
            <h1 className="text-center font-extrabold">Parent Signature</h1>
            <Image
              src="/no_img.png"
              alt="Parent Signature"
              className="w-full h-full p-2 max-h-[20rem] min-h-[20rem] object-contain rounded-xl"
            />
          </div>
        </div>
        {/* Branch Details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 pb-2  ">
          <TableDisplayContent id="Branch Details" rows={studentData["Branch Details"]} />
        </div>
      </div>
    </div>
  );
}

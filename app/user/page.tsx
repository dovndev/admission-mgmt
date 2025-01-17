"use client";
import Navbar from "../components/navbar";
import { Image, Button } from "@nextui-org/react";
import { STUDENTDATA as studentData } from "../mock/mockData";

{
  /*Icons */
}
import { MdOutlineEmail, MdOutlineDateRange, MdPhone, MdPeopleAlt, MdHomeFilled } from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="flex w-full lg:absolute justify-center top-0">
      <Navbar />
      </div>
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center w-full gap-4 p-4 ">
          {/* Student Details */}
          <div className="bg-textBoxBackground shadow-xl rounded-3xl p-8 max-w-[16rem] w-full flex flex-col items-center justify-center">
            <Image
              alt="Student Picture"
              className=" object-contain max-h-[10rem] min-h[10rem] rounded-3xl border-large border-foreground "
              src="no_img.png"
            />
            <h2 className="text-xl font-semibold text-center pt-2">{studentData["Student Details"]["Name"]}</h2>
            <div className="flex itmes-center"></div>
            <div className="flex items-center">
              <MdOutlineDateRange className="mr-1" />
              {studentData["Student Details"]["Date of Birth"]}
            </div>
            <div className="flex items-center">
              <MdOutlineEmail className="mr-1" />
              {studentData["Student Details"]["Email"]}
            </div>
            <div className="flex items-center">
              <MdPhone className="mr-1" />
              {studentData["Student Details"]["Phone 1"]}
            </div>
            <div className="flex items-center">
              <MdPhone className="mr-1" />
              {studentData["Student Details"]["Phone 2"]}
            </div>
            <div className="pt-2 w-full">
              <Button className="m-1" variant="bordered">
                Log out
              </Button>
              <Button className="m-1">Print</Button>
            </div>
          </div>

          {/*Parent and Course details*/}
          <div className="bg-textBoxBackground shadow-xl rounded-3xl p-8 max-w-md w-full flex flex-col items-start justify-start">
            <div className="flex items-center mb-2">
              <MdPeopleAlt className="mr-1" />
              <h2 className="text-xl font-semibold">Parental Details</h2>
            </div>
            <div>
              <h2 className="mb-1 font-bold">
                <span className="font-light">Parent/Guardian: </span>
                {studentData["Student Details"]["Parent Name"]}
              </h2>
              <h2 className="mb-1 font-bold">
                <span className="font-light">Occupation: </span>
                {studentData["Student Details"]["Parent Occupation"]}
              </h2>
              <h2 className="mb-1 font-bold">
                <span className="font-light">Relationship with Applicant: </span>
                {studentData["Student Details"]["Relationship with Applicant"]}
              </h2>
              <h2 className="mb-1 font-bold">
                <span className="font-light">NRI Sponsor: </span>
                {studentData["Student Details"]["NRI Sponsor"]}
              </h2>
            </div>
            <div className="flex items-center mb-2 mt-4">
              <FaGraduationCap className="mr-1" />
              <h2 className="text-xl font-semibold">Course Details</h2>
            </div>
            <div>
              <h2 className="mb-1 font-bold">
                <span className="font-light">Course: </span>
                {studentData["Student Details"]["Course"]}
              </h2>
              <h2 className="mb-1 font-bold">
                <span className="font-light">Quota: </span>
                {studentData["Student Details"]["Quota"]}
              </h2>
              <h2 className="mb-1 font-bold">
                <span className="font-light">Branch Opted: </span>
                {studentData["Branch Details"]["Branch Preference"]}
              </h2>
              <h2 className="mb-1 font-bold">
                <span className="font-light">Academic Year: </span>
                {studentData["Student Details"]["Academic Year"]}
              </h2>
            </div>
          </div>

          {/*Address details*/}
          <div className="bg-textBoxBackground shadow-xl rounded-3xl p-8 max-w-md w-full flex flex-col items-start justify-start">
            <div className="flex items-center mb-2">
              <MdPhone className="mr-1" />
              <h2 className="text-xl font-semibold">Contact Address</h2>
            </div>
            <div>
              <h2 className="mb-1 font-light">{studentData["Contact Address"]["House Name"]}</h2>
              <h2 className="mb-1 font-light">{studentData["Contact Address"]["District, City"]}</h2>
              <h2 className="mb-1 font-light">
                {studentData["Contact Address"]["State"]}, {studentData["Contact Address"]["Pin"]}
              </h2>
            </div>
            <div className="flex items-center mt-4 mb-2">
              <MdHomeFilled className="mr-1" />
              <h2 className="text-xl font-semibold">Permanent Address</h2>
            </div>
            <div>
              <h2 className="mb-1 font-light">{studentData["Permanent Address"]["House Name"]}</h2>
              <h2 className="mb-1 font-light">{studentData["Permanent Address"]["District, City"]}</h2>
              <h2 className="mb-1 font-light">
                {studentData["Permanent Address"]["State"]}, {studentData["Permanent Address"]["Pin"]}
              </h2>
            </div>
          </div>
        </div>
      </div>

  );
}

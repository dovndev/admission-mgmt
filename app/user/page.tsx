"use client";
//import Navbar from "../components/navbar";
import { Image, Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/*Icons */
import {
  MdOutlineEmail,
  MdOutlineDateRange,
  MdPhone,
  MdPeopleAlt,
  MdHomeFilled,
} from "react-icons/md";
import { FaGraduationCap } from "react-icons/fa";
import useUserStore from "../store/userStore";
import { useSession, signOut } from "next-auth/react";

export default function Register() {
  const { userData, fetchUserData, clearUserData, isLoading, error } =
    useUserStore();
  const session = useSession();
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();
  const { data: sessionData, status: sessionStatus } = session;

  useEffect(() => {
    // In a real app, you would get the userId from authentication
    // This is just a placeholder - replace with your auth logic
    console.log("Session Data:", sessionData);
    const storedUserId = sessionData?.user?.id;
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    } else {
      // Redirect to login if no user ID
      // router.push("/login");
      console.log("No user ID found, redirecting to login...");
    }
  }, [fetchUserData, router, sessionData, sessionStatus]);

  const handleLogout = () => {
    clearUserData();
    signOut({ callbackUrl: "/login" });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner size="lg" />
        <p className="mt-4">Loading user data...</p>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-500">
          Error loading user data. Please try again.
        </p>
        <Button
          onClick={() => userId && fetchUserData(userId)}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background relative">
      {/* Background Image Container */}
      <div
        className="absolute top-0 left-0 w-full h-[25vh] bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('no_img.png')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
        }}
      />

      <div className="flex w-full lg:absolute justify-center top-0 z-10">
        {/*<Navbar mode="dark" />*/}
      </div>

      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center w-full gap-4 p-4 z-10 mt-20">
        {/*Parent and Course details*/}
        <div className="bg-textBoxBackground shadow-xl rounded-3xl p-8 max-w-md w-full flex flex-col items-start justify-start">
          <div className="flex items-center mb-2">
            <MdPeopleAlt className="mr-1" />
            <h2 className="text-xl font-semibold">Parental Details</h2>
          </div>
          <div>
            <h2 className="mb-1 font-bold">
              <span className="font-light">Parent/Guardian: </span>
              {userData["Student Details"]["Parent Name"]}
            </h2>
            <h2 className="mb-1 font-bold">
              <span className="font-light">Occupation: </span>
              {userData["Student Details"]["Parent Occupation"]}
            </h2>
            <h2 className="mb-1 font-bold">
              <span className="font-light">Relationship with Applicant: </span>
              {userData["Student Details"]["Relationship with Applicant"]}
            </h2>
            <h2 className="mb-1 font-bold">
              <span className="font-light">NRI Sponsor: </span>
              {userData["Student Details"]["NRI Sponsor"]}
            </h2>
          </div>
          <div className="flex items-center mb-2 mt-4">
            <FaGraduationCap className="mr-1" />
            <h2 className="text-xl font-semibold">Course Details</h2>
          </div>
          <div>
            <h2 className="mb-1 font-bold">
              <span className="font-light">Course: </span>
              {userData["Student Details"]["Course"]}
            </h2>
            <h2 className="mb-1 font-bold">
              <span className="font-light">Quota: </span>
              {userData["Student Details"]["Quota"]}
            </h2>
            <h2 className="mb-1 font-bold">
              <span className="font-light">Branch Opted: </span>
              {userData["Branch Details"]["Branch"]}
            </h2>
            <h2 className="mb-1 font-bold">
              <span className="font-light">Academic Year: </span>
              {userData["Student Details"]["Academic Year"]}
            </h2>
          </div>
        </div>

        {/*Address details*/}
        <div className="bg-textBoxBackground shadow-xl rounded-3xl p-8 max-w-md w-full flex flex-col items-start justify-start ">
          <div className="flex items-center mb-2">
            <MdPhone className="mr-1" />
            <h2 className="text-xl font-semibold">Contact Address</h2>
          </div>
          <div>
            <h2 className="mb-1 font-light">
              {userData["Contact Address"]["House Name"]}
            </h2>
            <h2 className="mb-1 font-light">
              {userData["Contact Address"]["District, City"]}
            </h2>
            <h2 className="mb-1 font-light">
              {userData["Contact Address"]["State"]},{" "}
              {userData["Contact Address"]["Pin"]}
            </h2>
          </div>
          <div className="flex items-center mt-4 mb-2">
            <MdHomeFilled className="mr-1" />
            <h2 className="text-xl font-semibold">Permanent Address</h2>
          </div>
          <div>
            <h2 className="mb-1 font-light">
              {userData["Permanent Address"]["House Name"]}
            </h2>
            <h2 className="mb-1 font-light">
              {userData["Permanent Address"]["District, City"]}
            </h2>
            <h2 className="mb-1 font-light">
              {userData["Permanent Address"]["State"]},{" "}
              {userData["Permanent Address"]["Pin"]}
            </h2>
          </div>
        </div>

        {/* Student Details */}
        <div className="bg-textBoxBackground shadow-xl rounded-3xl p-8 max-w-[16rem] w-full flex flex-col items-center justify-center z-10">
          <Image
            alt="Student Picture"
            className="object-contain max-h-[10rem] min-h[10rem] rounded-3xl border-large border-foreground"
            src={userData["Uploads"]["studentPhoto"] || "no_img.png"}
          />
          <h2 className="text-xl font-semibold text-center pt-2">
            {userData["Student Details"]["Name"]}
          </h2>
          <div className="flex items-center">
            <MdOutlineDateRange className="mr-1" />
            {userData["Student Details"]["Date of Birth"]}
          </div>
          <div className="flex items-center">
            <MdOutlineEmail className="mr-1" />
            {userData["Student Details"]["Email"]}
          </div>
          <div className="flex items-center">
            <MdPhone className="mr-1" />
            {userData["Student Details"]["Phone"]}
          </div>
          {userData["Student Details"]["Kerala Phone"] && (
            <div className="flex items-center">
              <MdPhone className="mr-1" />
              {userData["Student Details"]["Kerala Phone"]}
            </div>
          )}
          <div className="pt-2 w-full">
            <Button className="m-1" variant="bordered" onClick={handleLogout}>
              Log out
            </Button>
            <Button className="m-1" onClick={() => window.print()}>
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

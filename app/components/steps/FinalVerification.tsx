"use client";
import { Button, Checkbox, Image } from "@heroui/react";
import TableDisplayContent from "../TableDisplayContent";
import { STUDENTDATA as defaultStudentData } from "@/app/mock/mockData";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { conformSeat } from "@/app/actions/user-Actions";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/store/userStore";
import CustomToast from "../CustomToast";

export default function Register() {
  const router = useRouter();
  const session = useSession();
  const { data: sessionData } = session;

  // Use the userStore
  const { userData, fetchUserData, isLoading } = useUserStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false); // Initialize agreement state
  const [agreementError, setAgreementError] = useState(""); // State for agreement error

  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Agreement validation
    if (!isAgreed) {
      setAgreementError("You must agree to the terms and conditions.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userId = sessionData?.user?.id;
      if (!userId) {
        throw new Error("User not logged in");
      }

      const quota = userData?.["Student Details"]?.["Quota"]; // Use optional chaining
      const branch = userData?.["Branch Details"]?.["Branch"]; // Use optional chaining
      const year = parseInt(userData?.["Student Details"]?.["Academic Year"] || ""); // Use optional chaining

      if (!quota || !branch || isNaN(year)) {
        throw new Error("Missing required student data.");
      }

      const result = await conformSeat(userId, quota, branch, year);

      setSubmitStatus(result);

      if (result.success) {
        // Redirect to success page or dashboard after a brief delay
        CustomToast({
          title: "Seat Confirmed",
          description: "Seat confirmed successfully",
        });
        console.log("Seat confirmed successfully");
      }
    } catch (error: any) {
      // Type the error as any
      console.error("Form submission error:", error);
      CustomToast({
        title: "Error",
        description: error.message || "Error occurred while confirming seat", // Display specific error message
      });
      setSubmitStatus({
        success: false,
        message: error.message || "An unexpected error occurred. Please try again.", // Display specific error message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const uid = sessionData?.user?.id;
    if (uid) {
      fetchUserData(uid as string);
    }
  }, [sessionData, fetchUserData]);

  // Use userData from store or fallback to default if not available
  const studentData = userData || defaultStudentData;

  return (
    <div className="flex flex-col items-center justify-center w-full p-3">
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-4xl ">
        <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">Verification</h2>

        {/* Loading indicator */}
        {isLoading && <div className="text-center py-4">Loading student data...</div>}

        {/* Student Profile photo and signature */}
        <div className="flex flex-row justify-between space-x-4">
          <div className="flex flex-col items-center justify-end">
            <Image
              src={studentData?.Uploads?.studentPhoto || "/no_img.png"}
              alt="Student Photo"
              className="w-full h-full p-2 max-h-[20rem] min-h-[20rem] object-contain rounded-xl"
            />
            <h1 className="text-center">Student Photo</h1>
          </div>
          <div className="flex flex-col items-center justify-end">
            <Image
              src={studentData?.Uploads?.studentSignature || "/no_img.png"}
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
              src={studentData?.Uploads?.tenthCertificate || "/no_img.png"}
              alt="10th Certificate"
              className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
            />
          </div>
          {studentData?.Uploads?.keamCertificate && (
            <div className="flex flex-col w-full items-center justify-start">
              <h1 className="text-center font-extrabold pt-1">12th Mark Details</h1>
              <TableDisplayContent id="12th Mark Details" rows={studentData["12th Mark Details"]} />
              <Image
                src={studentData?.Uploads?.twelfthCertificate || "/no_img.png"}
                alt="12th Certificate"
                className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
              />
            </div>
          )}
        </div>

        {/* Keam Details */}
        {studentData?.Uploads?.keamCertificate && (
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 pt-2 pb-2  ">
            <div className="w-full ">
              <h1 className="text-center font-extrabold">
                KEAM Details<span className="text-muthootRed">*</span>
              </h1>
              <TableDisplayContent id="Keam Details" rows={studentData["Keam Details"]} />
            </div>
            <Image
              src={studentData?.Uploads?.keamCertificate || "/no_img.png"}
              alt="KEAM Certificate"
              className="w-full h-full p-2 max-h-[40rem] min-h-[40rem] object-contain rounded-xl"
            />
          </div>
        )}
        {/* Branch Details */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 pb-2  ">
          <TableDisplayContent id="Branch Details" rows={studentData["Branch Details"]} />
        </div>

        {/* Final submit*/}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Checkbox
            className=""
            required={true}
            checked={isAgreed}
            onChange={(e) => {
              setIsAgreed(e.target.checked);
              if (e.target.checked) setAgreementError("");
            }}
          >
            I hereby declare that all the information furnished above are true and correct and we will obey the rules
            and regulations of the institution if admitted
          </Checkbox>
          {agreementError && <p className="text-red-500 text-sm mt-1">{agreementError}</p>}

          <Button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm Seat"}
          </Button>
        </form>
      </div>
    </div>
  );
}

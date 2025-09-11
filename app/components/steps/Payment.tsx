import { useState, useEffect } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import { Button } from "@heroui/react";
import { Checkbox } from "@heroui/checkbox";
import { BANK_ACCOUNT as bankDetails } from "@/app/constants/dropdownOptions";
import TableDisplayContent from "../TableDisplayContent";
import FileUploadInput from "../FileUploadInput";
import { updatePaymentDetails } from "@/app/actions/onboarding-actions";
import CustomToast from "../CustomToast";
import { useRouter } from "next/navigation";
import { conformSeat } from "@/app/actions/user-Actions";
import { useSession } from "next-auth/react";
import useUserStore from "@/app/store/userStore";

export default function Payment() {
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const session = useSession();
  const { userData, fetchUserData } = useUserStore();

  // Initialize userData on component mount
  useEffect(() => {
    const userId = session.data?.user?.id;
    if (userId) {
      fetchUserData(userId);
    }
  }, [session.data, fetchUserData]);

  const [formData, setFormData] = useState({
    transactionNo: "",
    transactionSlip: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isSelected) {
      setError("Please agree to the declaration to proceed");
      return;
    }

    if (!formData.transactionNo) {
      setError("Please enter a transaction number");
      return;
    }

    if (!formData.transactionSlip) {
      setError("Please upload a transaction slip");
      return;
    }

    CustomToast({ title: "Submitting" });
    try {
      setIsLoading(true);

      // Step 1: Submit payment details
      const result = await updatePaymentDetails({
        transactionId: Number(formData.transactionNo),
        transactionSlip: formData.transactionSlip,
      });

      if (result.success) {
        // Get user information needed for seat confirmation
        const userId = session.data?.user?.id;
        if (!userId) {
          throw new Error("User not logged in");
        }

        // Extract required data from userData
        const quota = userData?.["Student Details"]?.["Quota"];
        const branch = userData?.["Branch Details"]?.["Branch"];
        const year = parseInt(
          userData?.["Student Details"]?.["Academic Year"] || ""
        );

        if (!quota || !branch || isNaN(year)) {
          throw new Error(
            "Missing required student data for seat confirmation"
          );
        }

        // Step 2: Confirm seat
        const seatResult = await conformSeat(userId, quota, branch, year);

        if (seatResult.success) {
          CustomToast({
            title: "Success",
            description:
              "Payment details saved and seat confirmed successfully",
          });
          router.push("/user");
        } else {
          setError(
            `Payment submitted but seat confirmation failed: ${seatResult.message}`
          );
          CustomToast({
            title: "Warning",
            description: "Payment submitted but seat confirmation failed",
          });
        }
      } else {
        setError(result.message || "Failed to submit payment details");
        CustomToast({ title: "Failed to submit payment details" });
      }
    } catch (error) {

      console.error(
        error instanceof Error
          ? error.message
          : "Failed to complete the process"
      );
      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit payment details. Please try again."
      );
      CustomToast({
        title: "Process failed",
        description: error instanceof Error ? error.message : "Unknown error",
      });

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-center justify-center w-full p-3" onSubmit={handleSubmit}>
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-full sm:max-w-7xl">
        {/* Loading overlay shown while submitting */}
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-3xl w-full h-full">
            <div className="flex items-center space-x-3 bg-transparent p-4 rounded">
              <div className="w-10 h-10 border-4 border-t-transparent bark:border-white rounded-full animate-spin" />
              <span className="dark:text-white font-medium">Submitting...</span>
            </div>
          </div>
        )}


        {
          (
            <div>
              <h1 className="p-4 text-2xl">Payment</h1>
              <div className="flex flex-col gap-10 space-y-4 md:space-y-0 md:flex-col md:space-x-4">
                <p className="text-center text-red-500">
                  Pay Provisional registration fee of Rs 1,50,500 for CSE, Rs 1,00,500 for CS(Al), Al & DS, CS(CY), ECE and Rs
                  50,500 for Group-B programmes to the following bank account and upload the photo of transaction slip here
                </p>
                <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
                  <div className="flex flex-col gap-4 m-auto md:w-[50%] w-full">
                    <TableDisplayContent id="Student Data" rows={bankDetails} />
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                    <div className="w-full">
                      <FloatingLabelInput
                        id="transactionNo"
                        label="Transaction No"
                        required
                        autoComplete="off"
                        onChange={handleChange}
                        value={formData.transactionNo}
                        labelPlacement="outside"
                      />
                      <div className="mt-4">
                        <FileUploadInput
                          id="transactionSlip"
                          label="Transaction Slip"
                          required
                          onChange={handleChange}
                          setFileLink={(url) => {
                            setFormData((prev) => ({
                              ...prev,
                              transactionSlip: url,
                            }));
                          }}
                        />
                        {formData.transactionSlip && (
                          <div className="text-green-600 text-sm mt-1">Transaction slip uploaded successfully</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-red-500">Upload an image file of size less than 2mb</span>

                  {error && <div className="text-red-500 bg-red-50 p-2 rounded w-full text-center">{error}</div>}

                  <Checkbox onValueChange={() => setIsSelected(!isSelected)} isSelected={isSelected} color="warning">
                    I agree that I have reviewed the form, and am proceeding for final Submit
                  </Checkbox>
                </div>
              </div>
              <div className="flex flex-col items-center m-6">
                <Button
                  id="submt"
                  className="w-40"
                  color="danger"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading || !formData.transactionSlip}
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          )
        }
      </div>
    </form>
  );
}

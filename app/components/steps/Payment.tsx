import { useEffect, useState } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";
import { BANK_ACCOUNT as bankDetails } from "@/app/constants/dropdownOptions";

export default function Payment() {
  const [isSelected, setIsSelected] = useState(false);
  const [formData, setFormData] = useState({
    transactionNo: "",
    transactionSlip: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSelected) {
      console.log("Please agree to the declaration to proceed");
      return;
    } else {
      console.log(formData);
    }
  };
  const handleUpload = () => {
    //upload photo to db and get the url
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-3">
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-7xl ">
      <h1 className="p-4 text-2xl">Payment</h1>
      <div className="flex flex-col grid-rows-4 gap-10 md:flex-col space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-1 flex-col gap-10 ">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-red-500">
              Pay Provisional registration fee of Rs 1,50,500 for CSE ,Rs
              1,00,500 for CS(Al),Al & DS,CS(CY),ECE and Rs 50,500 for Group-B
              programmes to the following bank account and upload the photo of
              transaction slip here
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
            <div className="flex flex-col gap-4 mr-auto w-[50%]">
              <span>
                Name:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails.name)
                  }
                >
                  {bankDetails.name}
                </span>
              </span>
              <span>
                Address:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails.address)
                  }
                >
                  {bankDetails.address}
                </span>
              </span>
              <span>
                Phone:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails.phone)
                  }
                >
                  {bankDetails.phone}
                </span>
              </span>
              <span>
                Bank:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails.bank)
                  }
                >
                  {bankDetails.bank}
                </span>
              </span>
              <span>
                Address:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails["bank address"])
                  }
                >
                  {bankDetails["bank address"]}
                </span>
              </span>
            </div>
            <div className="flex flex-col gap-4 ml-auto w-[50%]">
              <span>
                Branch:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails.branch)
                  }
                >
                  {bankDetails.branch}
                </span>
              </span>
              <span>
                Phone:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails["branch phone"])
                  }
                >
                  {bankDetails["branch phone"]}
                </span>
              </span>
              <span>
                IFSC code:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails.IFSC)
                  }
                >
                  {bankDetails.IFSC}
                </span>
              </span>
              <span>
                MICR code:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails.MICR)
                  }
                >
                  {bankDetails.MICR}
                </span>
              </span>
              <span>
                Account No:{" "}
                <span
                  onClick={() =>
                    navigator.clipboard.writeText(bankDetails["account number"])
                  }
                >
                  {bankDetails["account number"]}
                </span>
              </span>
            </div>
          </div>

          <div className="flex flex-col  gap-4 ">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <span>Transaction No:</span>
              <div className="w-64">
                <FloatingLabelInput
                  id={"transactionNo"}
                  label={""}
                  required={true}
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.transactionNo}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                <span>Transaction Slip: </span>{" "}
                <div className="w-64">
                  <FloatingLabelInput
                    id={"transactionSlip"}
                    label={""}
                    required={true}
                    onChange={handleChange}
                    type="file"
                  />
                </div>
                <Button
                  color="warning"
                  variant="ghost"
                  id={"photosubmit"}
                  className="m-6"
                  onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    handleUpload();
                  }}
                  disabled={true}
                >
                  UPLOAD
                </Button>
              </div>
              <span className="text-red-500">
                Upload an image file of size less than 2mb
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Checkbox
                onValueChange={() => {
                  setIsSelected(!isSelected);
                }}
                isSelected={isSelected}
                color="warning"
              >
                I agree that I have reviewed the form, and is proceeding for
                final Submit
              </Checkbox>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-10 items-center m-6">
        <Button
          id="submt"
          className="w-40"
          color="danger"
          disabled={!isSelected}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
    </div>
  );
}

import { useState } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";
import { BANK_ACCOUNT as bankDetails } from "@/app/constants/dropdownOptions";
import TableDisplayContent from "../TableDisplayContent";
import FileUploadInput from "../FileUploadInput";

export default function Payment() {
  const [isSelected, setIsSelected] = useState(false);
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
    if (!isSelected) {
      console.log("Please agree to the declaration to proceed");
      return;
    } else {
      console.log(formData);
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full p-3"
      onSubmit={handleSubmit}
    >
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-full sm:max-w-7xl">
        <h1 className="p-4 text-2xl">Payment</h1>
        <div className="flex flex-col gap-10 space-y-4 md:space-y-0 md:flex-col md:space-x-4">
          <p className="text-center text-red-500">
            Pay Provisional registration fee of Rs 1,50,500 for CSE, Rs 1,00,500 for CS(Al),
            Al & DS, CS(CY), ECE and Rs 50,500 for Group-B programmes to the following bank account
            and upload the photo of transaction slip here
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex flex-col gap-4 m-auto w-full md:w-1/2">
              <TableDisplayContent id="Student Data" rows={bankDetails} />
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div>
                <FloatingLabelInput
                  id="transactionNo"
                  label="Transaction No"
                  required
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.transactionNo}
                  labelPlacement="outside"
                />
                <FileUploadInput
                  id="transactionSlip"
                  label="Transaction Slip"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>
            <span className="text-red-500">
              Upload an image file of size less than 2mb
            </span>
            <Checkbox
              onValueChange={() => setIsSelected(!isSelected)}
              isSelected={isSelected}
              color="warning"
            >
              I agree that I have reviewed the form, and am proceeding for final Submit
            </Checkbox>
          </div>
        </div>
        <div className="flex flex-col items-center m-6">
          <Button id="submt" className="w-40" color="danger" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

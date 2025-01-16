import { useState } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import DropDownInput from "../DropDownInput";
import InputDate from "../InputDate";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";
import { NRI_RELATION_OPTIONS } from "@/app/constants/dropdownOptions";

export default function PersonalDetails() {
  const [isSelected, setIsSelected] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    gender: "",
    dob: "",
    applyingYear: "",
    quota: "",
    program: "",
    aadharNo: "",
    religion: "",
    cast: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleUpload = () => {

  };

  return (
    <div className="">
      <h1 className="p-4 text-2xl">Personal Details</h1>
      <div className="flex flex-col grid-rows-4 gap-10 md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-1 flex-col gap-10 ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"firstName"}
                label={"First Name"}
                autoComplete="given-name"
                required={true}
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"middleName"}
                label={"Middle Name"}
                autoComplete="additional-name"
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"lastName"}
                label={"Last Name"}
                required={true}
                autoComplete="family-name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"contactNumber"}
                label={"Contact Ph. No(M)"}
                required={true}
                type={"number"}
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"contactNumberKerala"}
                label={"Contact Ph. No(Kerala)"}
                required={true}
                type={"number"}
                onChange={handleChange}
              />
              <InputDate
                id={"dob"}
                label={"Date of Birth"}
                required={true}
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"photo"}
                label={"Photo"}
                required={true}
                onChange={handleChange}
                type="file"
              />
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
            <span className="text-red-500 font-thin text-small">
              Upload an image file of size less than 2mb
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h1>Contact Address</h1>

            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"houseName"}
                label={"House Name"}
                required={true}
                autoComplete="family-name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"state"}
                label={"State"}
                required={true}
                autoComplete="state"
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"district"}
                label={"District"}
                required={true}
                autoComplete="district"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"city"}
                label={"City"}
                required={true}
                autoComplete="city"
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"pinCode"}
                label={"Pin Code"}
                required={true}
                autoComplete="pincode"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <Checkbox
                onValueChange={() => setIsSelected(!isSelected)}
                isSelected={isSelected}
              ></Checkbox>{" "}
              <span>Use Contact address as Permanent address</span>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h1>Permanent Address</h1>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"houseName"}
                label={"House Name"}
                required={true}
                autoComplete="family-name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"state"}
                label={"State"}
                required={true}
                autoComplete="state"
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"district"}
                label={"District"}
                required={true}
                autoComplete="district"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"city"}
                label={"City"}
                required={true}
                autoComplete="city"
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"pinCode"}
                label={"Pin Code"}
                required={true}
                autoComplete="pincode"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1>Parental Details</h1>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"guardian"}
                label={"Parent/Guardian"}
                required={true}
                autoComplete="parent"
                onChange={handleChange}
              />
              <FloatingLabelInput
                id={"occupation"}
                label={"Occupation"}
                required={true}
                autoComplete="occupation"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"sponsor"}
                label={"NRI Sponsor"}
                required={true}
                autoComplete="family-name"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <DropDownInput
                id={"sponsorRelation"}
                label={"Relationship with NRI Sponsor"}
                required={true}
                options={NRI_RELATION_OPTIONS}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-around">
            <span className="text-red-400">
              Note: make sure you click upload button before proceeding
            </span>{" "}
            <Button color="danger" onSubmit={handleSubmit}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

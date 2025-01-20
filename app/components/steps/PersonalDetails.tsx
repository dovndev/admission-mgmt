import { useEffect, useState } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import InputDate from "../InputDate";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";

export default function PersonalDetails() {
  const [isSelected, setIsSelected] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    contactNumber: "",
    contactNumberKerala: "",
    dob: "",
    photo: "",
    houseName: "",
    state: "",
    district: "",
    city: "",
    pinCode: "",
    houseNamePermanent: "",
    statePermanent: "",
    districtPermanent: "",
    cityPermanent: "",
    pinCodePermanent: "",
    guardian: "",
    occupation: "",
    sponsor: "",
    sponsorRelation: "",
  });

  useEffect(() => {
    if (isSelected) {
      setFormData((prev) => ({
        ...prev,
        houseNamePermanent: prev.houseName,
        statePermanent: prev.state,
        districtPermanent: prev.district,
        cityPermanent: prev.city,
        pinCodePermanent: prev.pinCode,
      }));
    }
  }, [
    isSelected,
    formData.houseName,
    formData.state,
    formData.district,
    formData.city,
    formData.pinCode,
  ]);

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
    //upload photo to db and get the url
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
                value={formData.firstName}
              />
              <FloatingLabelInput
                id={"middleName"}
                label={"Middle Name"}
                autoComplete="additional-name"
                onChange={handleChange}
                value={formData.middleName}
              />
              <FloatingLabelInput
                id={"lastName"}
                label={"Last Name"}
                required={true}
                autoComplete="family-name"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"contactNumber"}
                label={"Contact Ph. No(M)"}
                required={true}
                type={"number"}
                onChange={handleChange}
                value={formData.contactNumber}
              />
              <FloatingLabelInput
                id={"contactNumberKerala"}
                label={"Contact Ph. No(Kerala)"}
                required={true}
                type={"number"}
                onChange={handleChange}
                value={formData.contactNumberKerala}
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
                value={formData.houseName}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"state"}
                label={"State"}
                required={true}
                autoComplete="state"
                onChange={handleChange}
                value={formData.state}
              />
              <FloatingLabelInput
                id={"district"}
                label={"District"}
                required={true}
                autoComplete="district"
                onChange={handleChange}
                value={formData.district}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"city"}
                label={"City"}
                required={true}
                autoComplete="city"
                onChange={handleChange}
                value={formData.city}
              />
              <FloatingLabelInput
                id={"pinCode"}
                label={"Pin Code"}
                required={true}
                autoComplete="pincode"
                onChange={handleChange}
                value={formData.pinCode}
                type="number"
              />
            </div>
            <div className="flex flex-row ">
              <Checkbox
                onValueChange={() => {
                  setIsSelected(!isSelected);
                }}
                isSelected={isSelected}
                color="warning"
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
                id={"houseNamePermanent"}
                label={"House Name"}
                required={true}
                autoComplete="family-name"
                onChange={handleChange}
                value={formData.houseNamePermanent}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"statePermanent"}
                label={"State"}
                required={true}
                autoComplete="state"
                onChange={handleChange}
                value={formData.statePermanent}
              />
              <FloatingLabelInput
                id={"districtPermanent"}
                label={"District"}
                required={true}
                autoComplete="district"
                onChange={handleChange}
                value={formData.districtPermanent}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"cityPermanent"}
                label={"City"}
                required={true}
                autoComplete="city"
                onChange={handleChange}
                value={formData.cityPermanent}
              />
              <FloatingLabelInput
                id={"pinCodePermanent"}
                label={"Pin Code"}
                required={true}
                autoComplete="pincode"
                onChange={handleChange}
                value={formData.pinCodePermanent}
                type="number"
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
                value={formData.guardian}
              />
              <FloatingLabelInput
                id={"occupation"}
                label={"Occupation"}
                required={true}
                autoComplete="occupation"
                onChange={handleChange}
                value={formData.occupation}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"sponsor"}
                label={"NRI Sponsor"}
                required={true}
                autoComplete="family-name"
                onChange={handleChange}
                value={formData.sponsor}
              />
            </div>
            <div className="flex flex-col gap-4 md:flex-row ">
              <FloatingLabelInput
                id={"sponsorRelation"}
                label={"Relationship with NRI Sponsor"}
                required={true}
                autoComplete="off"
                onChange={handleChange}
                value={formData.sponsorRelation}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-around">
            <span className="text-red-400">
              Note: make sure you click upload button before proceeding
            </span>{" "}
            <Button color="danger" onSubmit={handleSubmit}>Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

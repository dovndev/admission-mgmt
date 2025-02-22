import { useEffect, useState } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import InputDate from "../InputDate";
import { Button } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/checkbox";
import FileUploadInput from "../FileUploadInput";
import { personalDetailsAction } from "../../actions/onboarding-actions";
import { type PersonalDetailsFormData } from "@/schemas";

export default function PersonalDetails() {
  const [isSelected, setIsSelected] = useState(false);

  // Initialize form state with proper types
  const [formData, setFormData] = useState<PersonalDetailsFormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
    keralaMobileNumber: "",
    dob: "",
    photo: "",
    contactAddress: {
      houseName: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
    },
    permanentAddress: {
      houseName: "",
      state: "",
      district: "",
      city: "",
      pincode: "",
    },
    parentDetails: {
      guardian: "",
      occupation: "",
      sponsor: "",
      relation: "",
    },
  });

  useEffect(() => {
    if (isSelected) {
      setFormData((prev) => ({
        ...prev,
        permanentAddress: {
          ...prev.permanentAddress,
          houseName: prev.contactAddress.houseName,
          state: prev.contactAddress.state,
          district: prev.contactAddress.district,
          city: prev.contactAddress.city,
          pincode: prev.contactAddress.pincode,
        },
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

    // Map form field IDs to schema fields
    const fieldMappings: Record<
      string,
      { section: keyof PersonalDetailsFormData; field: string }
    > = {
      // Personal details
      firstName: { section: "firstName", field: "firstName" },
      middleName: { section: "middleName", field: "middleName" },
      lastName: { section: "lastName", field: "lastName" },
      contactNumber: { section: "mobileNumber", field: "mobileNumber" },
      contactNumberKerala: {
        section: "keralaMobileNumber",
        field: "keralaMobileNumber",
      },
      dob: { section: "dob", field: "dob" },
      photo: { section: "photo", field: "photo" },

      // Contact address
      houseName: { section: "contactAddress", field: "houseName" },
      state: { section: "contactAddress", field: "state" },
      district: { section: "contactAddress", field: "district" },
      city: { section: "contactAddress", field: "city" },
      pinCode: { section: "contactAddress", field: "pincode" },

      // Permanent address
      houseNamePermanent: { section: "permanentAddress", field: "houseName" },
      statePermanent: { section: "permanentAddress", field: "state" },
      districtPermanent: { section: "permanentAddress", field: "district" },
      cityPermanent: { section: "permanentAddress", field: "city" },
      pinCodePermanent: { section: "permanentAddress", field: "pincode" },

      // Parent details
      guardian: { section: "parentDetails", field: "guardian" },
      occupation: { section: "parentDetails", field: "occupation" },
      sponsor: { section: "parentDetails", field: "sponsor" },
      sponsorRelation: { section: "parentDetails", field: "relation" },
    };

    const mapping = fieldMappings[id];
    if (!mapping) return;

    setFormData((prev) => {
      if (
        mapping.section === "contactAddress" ||
        mapping.section === "permanentAddress" ||
        mapping.section === "parentDetails"
      ) {
        return {
          ...prev,
          [mapping.section]: {
            ...prev[mapping.section],
            [mapping.field]: value,
          },
        };
      }
      return {
        ...prev,
        [mapping.section]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await personalDetailsAction(formData);
      if (response.success) {
        console.log(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error submitting personal details", error);
    }
  };

  const handleUpload = () => {
    //upload photo to db and get the url
    return;
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full p-3"
      onSubmit={handleSubmit}
    >
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-7xl ">
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
                  value={formData.mobileNumber}
                />
                <FloatingLabelInput
                  id={"contactNumberKerala"}
                  label={"Contact Ph. No(Kerala)"}
                  required={true}
                  type={"number"}
                  onChange={handleChange}
                  value={formData.keralaMobileNumber}
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
                <FileUploadInput
                  id="studentPhoto"
                  label="Photo"
                  required={true}
                  onChange={handleChange}
                />
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
                  value={formData.contactAddress.houseName}
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"state"}
                  label={"State"}
                  required={true}
                  autoComplete="state"
                  onChange={handleChange}
                  value={formData.contactAddress.state}
                />
                <FloatingLabelInput
                  id={"district"}
                  label={"District"}
                  required={true}
                  autoComplete="district"
                  onChange={handleChange}
                  value={formData.contactAddress.district}
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"city"}
                  label={"City"}
                  required={true}
                  autoComplete="city"
                  onChange={handleChange}
                  value={formData.contactAddress.city}
                />
                <FloatingLabelInput
                  id={"pinCode"}
                  label={"Pin Code"}
                  required={true}
                  autoComplete="pincode"
                  onChange={handleChange}
                  value={formData.contactAddress.pincode}
                  type="number"
                />
              </div>
              <div className="flex flex-row gap-4 md:flex-row ">
                <Checkbox
                  color="warning"
                  onValueChange={() => {
                    setIsSelected(!isSelected);
                  }}
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
                  id={"houseNamePermanent"}
                  label={"House Name"}
                  required={true}
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={formData.permanentAddress.houseName}
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"statePermanent"}
                  label={"State"}
                  required={true}
                  autoComplete="state"
                  onChange={handleChange}
                  value={formData.permanentAddress.state}
                />
                <FloatingLabelInput
                  id={"districtPermanent"}
                  label={"District"}
                  required={true}
                  autoComplete="district"
                  onChange={handleChange}
                  value={formData.permanentAddress.district}
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"cityPermanent"}
                  label={"City"}
                  required={true}
                  autoComplete="city"
                  onChange={handleChange}
                  value={formData.permanentAddress.city}
                />
                <FloatingLabelInput
                  id={"pinCodePermanent"}
                  label={"Pin Code"}
                  required={true}
                  autoComplete="pincode"
                  onChange={handleChange}
                  value={formData.permanentAddress.pincode}
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
                  value={formData.parentDetails.guardian}
                />
                <FloatingLabelInput
                  id={"occupation"}
                  label={"Occupation"}
                  required={true}
                  autoComplete="occupation"
                  onChange={handleChange}
                  value={formData.parentDetails.occupation}
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"sponsor"}
                  label={"NRI Sponsor"}
                  required={true}
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={formData.parentDetails.sponsor}
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"sponsorRelation"}
                  label={"Relationship with NRI Sponsor"}
                  required={true}
                  autoComplete="off"
                  onChange={handleChange}
                  value={formData.parentDetails.relation}
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-around">
              <span className="text-red-400">
                Note: make sure you click upload button before proceeding
              </span>{" "}
              <Button color="danger" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

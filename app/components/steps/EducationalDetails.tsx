import { useState, useEffect } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import DropDownInput from "../DropDownInput";
import { Button } from "@nextui-org/react";
import { _10TH_BOARD, _12TH_BOARD } from "@/app/constants/dropdownOptions";
import FileUploadInput from "../FileUploadInput";
import { updateEducationDetails } from "../../actions/onboarding-actions";
import { EducationalDetailsFormData } from "@/schemas";
import useUserStore from "@/app/store/userStore";

export default function EducationalDetails() {
  const { userData, refreshUserData } = useUserStore();
  const [formData, setFormData] = useState<EducationalDetailsFormData>({
    _10thSchool: "",
    _10thBoard: "",
    _10thMarklist: "",
    _12thSchool: "",
    _12thBoard: "",
    _12thMarklist: "",
    KeamYear: "",
    KeamRollNo: "",
    KeamRank: "",
    PaperOneScore: "",
    PaperTwoScore: "",
    KeamScore: "",
    KeamMarklist: "",
  });

  // Pre-populate form with user data if available
  useEffect(() => {
    if (userData) {
      console.log("User data in EducationalDetails:", userData);
      const tenthData = userData["10th Mark Details"] || {};
      const twelfthData = userData["12th Mark Details"] || {};
      const keamData = userData["Keam Details"] || {};
      const uploads = userData["Uploads"] || {};

      setFormData({
        _10thSchool: tenthData["Name of Institution"] || "",
        _10thBoard: tenthData["Board"],
        _10thMarklist: uploads["tenthCertificate"] || "",
        _12thSchool: twelfthData["Name of Institution"] || "",
        _12thBoard: twelfthData["Board"],
        _12thMarklist: uploads["twelfthCertificate"] || "",
        KeamYear: keamData["Year"] || "",
        KeamRollNo: keamData["Roll No"] || "",
        KeamRank: keamData["Rank"] || "",
        PaperOneScore: keamData["Paper 1 score(Physics and Chemistry)"] || "",
        PaperTwoScore: keamData["Paper 2 score(Mathematics)"] || "",
        KeamScore: keamData["Total Keam Score"] || "",
        KeamMarklist: uploads["keamCertificate"] || "",
      });
    }
  }, [userData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateEducationDetails(formData);
      if (response.success) {
        console.log(response.message);
        // Refresh user data after successful update
        await refreshUserData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error submitting educational details", error);
      throw error;
    }
  };
  const setFileLink = (fieldName: string, url: string) => {
    setFormData((prev) => ({ ...prev, [fieldName]: url }));
  };

  const renderFileUpload = (id: string, label: string, fileUrl: string) => {
    return (
      <div className="flex flex-col gap-2">
        <FileUploadInput
          id={id}
          label={label}
          required={true}
          onChange={handleChange}
          setFileLink={(url) => setFileLink(id, url)}
          value={fileUrl} // Add this prop to pass the current file URL
        />
        {fileUrl ? (
          <div className="text-green-600 text-sm font-medium">
            File already uploaded. You can upload again to replace it.
          </div>
        ) : (
          <span className="text-red-500 font-thin text-small">
            Upload an image file of size less than 2mb
          </span>
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center w-full p-3"
    >
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-7xl ">
        <h1 className="p-4 text-2xl">Educational Details</h1>
        <div className="flex flex-col grid-rows-4 gap-10 md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex flex-1 flex-col gap-10 ">
            <div className="flex flex-col gap-4">
              <h1 className="m-4 font-bold">10th Exam Details</h1>

              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"_10thSchool"}
                  label={
                    "Name of School/Institution attended for SSLC/AISSE(10th)*"
                  }
                  autoComplete="school"
                  required={true}
                  onChange={handleChange}
                  value={formData._10thSchool}
                  labelPlacement="outside"
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <DropDownInput
                  id={"_10thBoard"}
                  label={"Select Board"}
                  required={true}
                  options={_10TH_BOARD}
                  onChange={handleChange}
                  value={formData._10thBoard}
                  labelPlacement="outside"
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                {renderFileUpload(
                  "_10thMarklist",
                  "Mark list upload [10th]",
                  formData._10thMarklist
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="m-4 font-bold">12th Exam Details(optional)</h1>

              <div className="flex flex-col gap-4 md:flex-row ">
                <FloatingLabelInput
                  id={"_12thSchool"}
                  label={
                    "Name of School/Institution attended for qualifying exam (+2/12th)*"
                  }
                  autoComplete="school"
                  required={false}
                  onChange={handleChange}
                  value={formData._12thSchool}
                  labelPlacement="outside"
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                <DropDownInput
                  id={"_12thBoard"}
                  label={"Select Board"}
                  required={false}
                  options={_12TH_BOARD}
                  onChange={handleChange}
                  value={formData._12thBoard}
                  labelPlacement="outside"
                />
              </div>
              <div className="flex flex-col gap-4 md:flex-row ">
                {renderFileUpload(
                  "_12thMarklist",
                  "Mark list upload [12th]",
                  formData._12thMarklist
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <h1 className="m-4 font-bold">
              Details of Common Entrance Test (KEAM)(optional)
            </h1>
            <div className="flex flex-col gap-4 md:flex-row  justify-between">
              <span>Year</span>
              <div className="w-64">
                <FloatingLabelInput
                  id={"KeamYear"}
                  label={""}
                  autoComplete="given-name"
                  required={false}
                  onChange={handleChange}
                  value={formData.KeamYear}
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row  justify-between">
              <span>Roll No</span>
              <div className="w-64">
                <FloatingLabelInput
                  id={"KeamRollNo"}
                  label={""}
                  required={false}
                  type={"number"}
                  onChange={handleChange}
                  value={formData.KeamRollNo}
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row  justify-between">
              <span>Rank</span>
              <div className="w-64">
                <FloatingLabelInput
                  id={"KeamRank"}
                  label={""}
                  required={false}
                  type={"number"}
                  onChange={handleChange}
                  value={formData.KeamRank}
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row  justify-between">
              <span>Paper I score(Physics & chemistry) </span>
              <div className="w-64">
                <FloatingLabelInput
                  id={"PaperOneScore"}
                  label={""}
                  required={false}
                  type={"number"}
                  onChange={handleChange}
                  value={formData.PaperOneScore}
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row  justify-between">
              <span>Paper II score(Mathematics)</span>
              <div className="w-64">
                <FloatingLabelInput
                  id={"PaperTwoScore"}
                  label={""}
                  required={false}
                  type={"number"}
                  onChange={handleChange}
                  value={formData.PaperTwoScore}
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row justify-between">
              <span>Total KEAM Score</span>
              <div className="w-64">
                <FloatingLabelInput
                  id={"KeamScore"}
                  label={""}
                  required={false}
                  type={"number"}
                  onChange={handleChange}
                  value={formData.KeamScore}
                  labelPlacement="outside"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:flex-row">
              {renderFileUpload(
                "KeamMarklist",
                "Mark list upload [KEAM]",
                formData.KeamMarklist
              )}
            </div>
            <div className="flex flex-col text-center gap-4 w-full justify-around">
              <span className="text-red-500  bg-opacity-40 p-2 rounded-lg">
                After selecting the mark list make sure you click UPLOAD button.
                Your last change will be saved, you can also use the upload
                button to change the file later.
              </span>{" "}
              <Button color="danger" className="ml-auto" type="submit">
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

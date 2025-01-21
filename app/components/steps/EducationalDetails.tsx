import { useState } from "react";
import FloatingLabelInput from "../FloatingLabelInput";
import DropDownInput from "../DropDownInput";
import { Button } from "@nextui-org/react";
import { _10TH_BOARD, _12TH_BOARD } from "@/app/constants/dropdownOptions";

export default function EducationalDetails() {
  const [formData, setFormData] = useState({
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
    <div className="flex flex-col items-center justify-center w-full p-3">
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-7xl ">
      <h1 className="p-4 text-2xl">Educatinal Details</h1>
      <div className="flex flex-col grid-rows-4 gap-10 md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex flex-1 flex-col gap-10 ">
          <div className="flex flex-col gap-4">
            <h1 className="m-4">10th Exam Details</h1>

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
              <FloatingLabelInput
                id={"_10thMarklist"}
                label={"Mark list upload [10th]"}
                required={true}
                onChange={handleChange}
                type="file"
                labelPlacement="outside"
              />
              <Button
                color="warning"
                variant="ghost"
                id={"_10thMarklist"}
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
            <h1 className="m-4">12th Exam Details(optional)</h1>

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
              <FloatingLabelInput
                id={"_12thMarklist"}
                label={"Mark list upload [12th]"}
                required={false}
                onChange={handleChange}
                type="file"
                labelPlacement="outside"
              />
              <Button
                color="warning"
                variant="ghost"
                id={"_12thMarklist"}
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
        </div>
        <div className="flex flex-1 flex-col gap-6">
          <h1 className="m-4">Details of Common Entrance Test (KEAM)(optional)</h1>
          <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
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
          <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
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
          <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
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
          <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
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
          <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
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
          <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
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
            <FloatingLabelInput
              id={"KeamMarklist"}
              label={"Mark list upload [KEAM]"}
              required={false}
              onChange={handleChange}
              type="file"
            />
            <Button
              color="warning"
              variant="ghost"
              id={"KeamMarklist"}
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
          <div className="flex flex-col text-center gap-4 w-full justify-around">
            <span className="text-red-500  bg-opacity-40 p-2 rounded-lg">
              After selecting the mark list make sure you click UPLOAD button.
              Your ast change will be saved, you can also use the upload button
              to change the file later.
            </span>{" "}
            <Button color="danger" className="ml-auto" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

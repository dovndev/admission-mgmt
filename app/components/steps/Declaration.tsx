"use client";
import DropDownInput from "../DropDownInput";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { BRANCH_OPTIONS } from "../../constants/dropdownOptions";
import { Checkbox } from "@nextui-org/react";
import FileUploadInput from "../FileUploadInput";

export default function Declaration() {
  const [formData, setFormData] = useState({
    preferedBranch: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const year = "2024";
  return (
    <div className="flex flex-col items-center justify-center w-full p-3">
      <div className="bg-textBoxBackground relative shadow-xl rounded-3xl p-4 sm:p-8 w-full max-w-[100%] sm:max-w-4xl ">
        <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">Branch Selection</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <DropDownInput id={"branch"} label={"Branch"} required={true} options={BRANCH_OPTIONS} onChange={handleChange} />
          </div>
          <p className="text-xl my-6 text-center underline">Instructions</p>
          <div className="w-full space-y-4 p-2">
            <p className="font-semibold ">1. GROUP A branches [ECE, CSE, Artificial Intelligence, AI&DS, CyberSecurity]</p>
            <p>
              {`I am aware about the criteria followed by "Muthoot Institute
            of Technology and Science", for the B-Tech NRI Quota admission for
            the year ${year}, such that my ward has to attain 80% Marks for
            Mathematics individually and 80% put together in Physics, Chemistry
            & Mathematics, in the 12th standard, for Qualifying
            examination(CBSE/ISC) OR attain 80% Marks for Mathematics
            individually and 80% put together in Physics, Chemistry &
            Mathematics, in the 12th standard(Terminal Evaluation TE), for
            Qualifying examination(State Board). If my ward failed to do so,
            there is no claim, from my side for the admission`}
            </p>
            <p className="font-semibold ">2. GROUP B branches [CE, ME, EEE,]</p>
            <p>
              {`I am aware about the criteria followed by "Muthoot Institute of
            Technology and Science", for the B-Tech NRI Quota admission for the
            year ${year}, such that my ward has to attain 75% Marks for Mathematics
            individually and 75% put together in Physics, Chemistry &
            Mathematics, in the 12th standard, for Qualifying
            examination(CBSE/ISC) OR attain 75% Marks for Mathematics
            individually and 75% put together in Physics, Chemistry &
            Mathematics, in the 12th standard(Terminal Evaluation TE), for
            Qualifying examination(State Board). If my ward failed to do so,
            there is no claim, from my side for the admission`}
            </p>
          </div>

          <div className="w-full space-y-4 p-2 border-[3px] rounded-md mt-3 border-orange-500">
            <p className="text-center font-semibold text-orange-500">EXIT OPTION </p>
            <p>
              1. A student can opt to <b className="text-orange-500">EXIT</b> from NRI quota before <b>5 </b>
              days, after the publication of <b className="text-orange-500">KEAM {year} SCORE/answer key</b> whichever is earlier and will be
              reimbursed with the entire amount after deducting Rs
              <b> 1000</b> as processing fee. However, a student will be automatically considered for MITS Management Merit Quota from NRI quota if he
              desires so and has to <b className="text-orange-500">freeze</b> the registration in MITS by sending an email to admissions@mgits.ac.in .
              <b className="text-orange-500">Request for exit</b> should be mailed to <b className="text-orange-500">admissions@mgits.ac.in</b> within
              the stipulated time. There after the registered choice will be frozen and will not be eligible for any refund, if the admission is
              cancelled after 5 days from the date of KEAM SCORE publication.
            </p>

            <p>
              <b>2. </b> I hereby declare that I have read all the instructions, Exit options and undertake that all the information furnished above
              are true and correct and I will obey the rules and regulations of the institution if admitted
            </p>
          </div>
          <Checkbox isRequired>I have clearly read the instructions mentioned above and would like to proceed further</Checkbox>
          <FileUploadInput id={"signature"} label={"Signature of Applicant"} required={true} />
          <FileUploadInput id={"parentSignature"} label={"Signature of Parent"} required={true} />
          <h1 className="text-muthootRed">the image should be of filetype (jpeg/png) of size less than 2MB*</h1>
          <Button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
}

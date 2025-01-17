"use client";
import ProgressBar from "../components/ProgressBar";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { REGISTER_STEPS } from "../constants/dropdownOptions";

//step components
import PersonalDetails from "../components/steps/PersonalDetails";
import EducationalDetails from "../components/steps/EducationalDetails";
import Declaration from "../components/steps/Declaration";
import FinalVerification from "../components/steps/FinalVerification";
import Payment from "../components/steps/Payment";

export default function OnBoarding() {
  const [currentStep, setCurrentStep] = useState<number>(3);
  const handleNext = () => {
    setCurrentStep((prev) => (prev < REGISTER_STEPS.length - 1 ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetails />;
      case 1:
        return <EducationalDetails />;
      case 2:
        return <Declaration />;
      case 3:
        return <FinalVerification />;
      case 4:
        return <Payment />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex justify-center h-20 w-full">
        <ProgressBar currentStep={currentStep} />
      </div>
      <div className="flex flex-col items-center min-h-screen bg-background pb-4 pt-4">
        <div className="w-full">{renderStepContent()}</div>

        <div className="flex space-x-4 bg-textBoxBackground items-center shadow-xl p-4 rounded-xl">
          <Button id="previousPage" className="bg-red-600 border-red-900 text-white" variant="bordered" onPress={handlePrevious} disabled={currentStep === 0}>
            Previous
          </Button>
          <Button id="nextPage"  className="bg-green-600 border-green-900 text-white" variant="bordered" onPress={handleNext} disabled={currentStep === REGISTER_STEPS.length - 1}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

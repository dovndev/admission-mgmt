"use client";
import ProgressBar from "../components/ProgressBar";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { registerSteps } from "../constants/dropdownOptions";

//step components
import PersonalDetails from "../components/steps/PersonalDetails";
import EducationalDetails from "../components/steps/EducationalDetails";
import Declaration from "../components/steps/Declaration";
import FinalVerification from "../components/steps/FinalVerification";
import Payment from "../components/steps/Payment";

export default function OnBoarding() {


  const [currentStep, setCurrentStep] = useState<number>(0);
  const handleNext = () => {
    setCurrentStep((prev) => (prev < registerSteps.length - 1 ? prev + 1 : prev));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalDetails/>;
      case 1:
        return <EducationalDetails />;
      case 2:
        return <Declaration/>;
      case 3:
        return <FinalVerification/>;
      case 4:
        return <Payment/>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <ProgressBar currentStep={currentStep} />
      <div className="w-full max-w-6xl p-4">{renderStepContent()}</div>

      <div className="flex space-x-4 mt-4">
        <Button id="previousPage" onPress={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button id="nextPage" onPress={handleNext} disabled={currentStep === registerSteps.length - 1}>
          Next
        </Button>
      </div>
    </div>
  );
}

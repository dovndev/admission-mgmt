"use client";

import Image from "next/image";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import { REGISTER_STEPS } from "../constants/dropdownOptions";
 
interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="fixed z-50 bg-textBoxBackground shadow max-w-[90%] w-full h-[60px] mt-5 mx-4 rounded-3xl flex items-center justify-between px-6">
      <div className="flex items-center">
        <Image src="/muthoot_logo.png" alt="Muthoot Logo" width={40} height={40} className="mr-4 rounded-xl cursor-pointer" />
      </div>

      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 items-center">
          <Breadcrumbs
            classNames={{
              list: "sm:gap-0 md:gap-1 lg:gap-5 xl:gap-6",
            }}
            itemClasses={{
              item: [
                "px-2 py-1 rounded-small",
                " data-[current=false]:text-foreground data-[current=false]:transition-colors",
                "data-[current=true]:bg-red-500 data-[current=true]:text-white data-[current=true]:transition-colors",
              ],
            }}
          >
            {REGISTER_STEPS.map((step, index) => (
              <BreadcrumbItem key={index} isCurrent={index === currentStep} className={`${index !== currentStep ? "hidden sm:flex" : ""}`}
              >
                {step}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </div>
      </div>

      <div className={`flex items-center`}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default ProgressBar;

"use client";

import Image from "next/image";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { Breadcrumbs, BreadcrumbItem, Button } from "@heroui/react";
import { REGISTER_STEPS } from "../constants/dropdownOptions";
import { FaPowerOff } from "react-icons/fa";

interface ProgressBarProps {
  currentStep: number;
  handleLogout: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, handleLogout }) => {
  return (
    <div className="fixed z-50 bg-textBoxBackground shadow max-w-[90%] w-full h-[60px] mt-5 mx-4 rounded-3xl flex items-center justify-between px-6">
      <div className="w-[100px] hidden sm:block">
        <Image
          src="/MITS.png"
          alt="Muthoot Logo"
          width={120}
          height={40}
          className="cursor-pointer object-contain h-auto w-full"
        />
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
              <BreadcrumbItem
                key={index}
                isCurrent={index === currentStep}
                className={`${index !== currentStep ? "hidden lg:flex" : ""}`}
              >
                {step}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
        </div>
      </div>

      <div className={`flex gap-6 md:gap-2 items-center`}>
        <ThemeToggle />
        <Button isIconOnly color={"danger"} variant="shadow" aria-label="Logout" onPress={handleLogout}>
          <FaPowerOff className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default ProgressBar;

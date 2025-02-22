"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DropDownInput from "./DropDownInput";
import { PROGRAM_OPTIONS } from "../constants/dropdownOptions";
import { Button } from "@nextui-org/react";
import { FaPowerOff } from "react-icons/fa";

interface NavbarAdminProps {
  mode?: "dark";
}

const YEAR_OPTIONS = ["2025", "2026", "2027"];

const NavbarAdmin: React.FC<NavbarAdminProps> = ({ mode = "" }) => {
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [isPowerOn, setIsPowerOn] = useState<boolean>(false);

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProgram(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  const handleYearEnable = () => {
    setIsPowerOn(!isPowerOn);
  };

  return (
    <div className="relative z-10 bg-white bg-opacity-[7%] shadow max-w-[90%] w-full h-[60px] mt-5 mx-4 rounded-3xl flex items-center justify-between gap-1 md:gap-10 px-6">
      <div className="flex items-center">
        <Link href="/" passHref>
          <Image
            src="/muthoot_logo.png"
            alt="Muthoot Logo"
            width={40}
            height={40}
            className="mr-4 rounded-xl cursor-pointer"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-end ">
        <div className="flex gap-2 items-center w-full md:w-[50%] lg:w-[30%] xl:w-[30%] ">
          <DropDownInput
            options={PROGRAM_OPTIONS}
            id="program"
            label="Program"
            labelPlacement="inside"
            size="sm"
            value={selectedProgram}
            onChange={handleProgramChange}
          />
          <DropDownInput
            options={YEAR_OPTIONS}
            id="year"
            label="Year"
            labelPlacement="inside"
            size="sm"
            value={selectedYear}
            onChange={handleYearChange}
          />

          <Button
            isIconOnly
            color={isPowerOn ? "success" : "danger"}
            variant="shadow"
            aria-label="Year enable"
            onPress={handleYearEnable}
          >
            <FaPowerOff className={`h-4 w-4 ${isPowerOn ? "text-white" : "text-white"}`} />
          </Button>
        </div>
      </div>

      <div className={`${mode === "dark" ? "hidden" : ""}`}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default NavbarAdmin;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DropDownInput from "./DropDownInput";
import { PROGRAM_OPTIONS } from "../constants/dropdownOptions";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { FaPowerOff } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { getAllAvailableYears } from "../actions/seat-Management-Actions";
import useAdminStore from "../store/adminStore";
import { signOut } from "next-auth/react";
import useUserStore from "../store/userStore";

// Add navigation options
const NAV_ITEMS = [
  { key: "adminHome", label: "Home", href: "/admin/adminHome" },
  { key: "adminNRI", label: "Admissions", href: "/admin/registrations" },
  //{ key: "approval", label: "Approval", href: "/admin/approval" },
  { key: "settings", label: "Settings", href: "/admin/status" },
  // { key: "logout", label: "Logout", href: "/logout" },
];

interface NavbarAdminProps {
  mode?: "dark";
}

const NavbarAdmin: React.FC<NavbarAdminProps> = ({ mode = "" }) => {
  const router = useRouter();

  const { setYears, years, setSelectedYear, selectedYear } = useAdminStore();
  const { clearUserData } = useUserStore();
  const [selectedProgram, setSelectedProgram] = useState<string>("");

  const handleLogout = () => {
    clearUserData();
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    (async () => {
      console.log("Fetching years...");
      const years = await getAllAvailableYears();
      setYears(years);
      console.log("Years fetched:", years);
    })();
  }, [setYears]);

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProgram(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  const handleNavigation = (key: string) => {
    const item = NAV_ITEMS.find((item) => item.key === key);
    if (item) {
      router.push(item.href);
    }
  };

  return (
    <div className="relative z-10 bg-white bg-opacity-[7%] shadow md:max-w-[90%] w-full h-[60px] mt-5 mx-1 md:mx-4 rounded-3xl flex items-center justify-between gap-1 md:gap-1 px-6">
      <div className="flex items-center md:gap-2">
        {/* Navigation Dropdown */}
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly variant="light" className="text-default-500">
              <FiMenu className="h-6 w-6" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Navigation Menu" onAction={(key) => handleNavigation(key.toString())}>
            {NAV_ITEMS.map((item) => (
              <DropdownItem key={item.key}>{item.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="w-[120px] hidden sm:block">
          <Image
            src="/MITS.png"
            alt="Muthoot Logo"
            width={120}
            height={40}
            className="cursor-pointer object-contain h-auto w-full"
          />
        </div>
      </div>
      <div className="ml-10 justify-end items-center gap-4 hidden lg:flex ">
        {NAV_ITEMS.map((item) => (
          <Link key={item.key} href={item.href} className="text-lg headerButton">
            {item.label}
          </Link>
        ))}
      </div>
      {/* Navigation Links */}
      <div className="flex-1 flex justify-end ">
        <div className="flex gap-1 md:gap-2  items-center w-full lg:w-[18rem] ">
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
            options={years.map(String)}
            id="year"
            label="Year"
            labelPlacement="inside"
            size="sm"
            value={selectedYear.toString()}
            onChange={handleYearChange}
          />
        </div>
      </div>

      <div className={`${mode === "dark" ? "hidden" : ""}`}>
        <ThemeToggle />
      </div>
      <Button isIconOnly color={"danger"} variant="shadow" aria-label="Year enable" onPress={handleLogout}>
        <FaPowerOff className={`h-4 w-4 "text-white"}`} />
      </Button>
    </div>
  );
};

export default NavbarAdmin;

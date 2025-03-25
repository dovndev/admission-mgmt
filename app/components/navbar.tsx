"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";


//this prop is used for forcing the navbar to use white text for the main page and remove the toggle
interface NavbarProps {
  mode?: "dark" | "light";
}

const Navbar: React.FC<NavbarProps> = ({ mode = "" }) => {
  return (
    <div className="relative z-10 bg-white bg-opacity-[7%] shadow max-w-[90%] w-full h-[60px] mt-5 mx-4 rounded-3xl flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link href="/" passHref>
          <Image src="/muthoot_logo.png" alt="Muthoot Logo" width={40} height={40} className="mr-4 rounded-xl cursor-pointer" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-center">
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 items-center md:gap-10">
          <Link href="/register" className="headerButton !text-muthootRed">
            Register
          </Link>
          <Link href="/login" className={`headerButton ${mode === "dark" ? "text-white" : ""} ${mode === "light" ? "text-black" : ""}`}>
            Login
          </Link>
          <Link href="/about" className={`headerButton ${mode == "dark" ? "text-white" : ""} ${mode === "light" ? "text-black" : ""} hidden sm:block`}>
            About
          </Link>
        </div>
      </div>

      <div className={`flex items-center `}>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;

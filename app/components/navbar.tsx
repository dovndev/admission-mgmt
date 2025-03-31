"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  mode?: "dark" | "light" | "";
}

const Navbar: React.FC<NavbarProps> = ({ mode = "" }) => {
  return (
    <div className="relative z-10 bg-white bg-opacity-[7%] shadow max-w-[95%] w-full h-auto min-h-[60px] mt-5 mx-auto rounded-3xl flex items-center px-3 sm:px-6 py-2">
      {/* Logo */}
      <div className="flex-shrink-0 w-[100px] sm:w-[120px]">
        <Link href="/" passHref>
          <Image 
            src="/MITS.png" 
            alt="Muthoot Logo" 
            width={120} 
            height={40} 
            className="cursor-pointer object-contain h-auto w-full" 
          />
        </Link>
      </div>

      {/* Navigation Links - Always visible, centered */}
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-row space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 items-center">
          <Link href="/register" className="headerButton !text-muthootRed text-center">
            Register
          </Link>
          <Link href="/login" className={`headerButton ${mode === "dark" ? "text-white" : ""} ${mode === "light" ? "text-black" : ""} text-center`}>
            Login
          </Link>
          {/* About link hidden on small screens */}
          <Link href="/about" className={`headerButton ${mode === "dark" ? "text-white" : ""} ${mode === "light" ? "text-black" : ""} hidden md:block text-center`}>
            About
          </Link>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="flex-shrink-0 sm:w-[120px] flex justify-end items-center">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;

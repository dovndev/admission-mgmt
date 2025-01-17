"use client";
import Navbar from "../components/navbar";
import { Button, Image } from "@nextui-org/react";
import { APPLICATION_DATA as applicantData } from "@/app/constants/dropdownOptions";


export default function Register() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-background">
      <Navbar />

      <div className="flex flex-auto items-center justify-center w-full p-3">
        <div className="bg-textBoxBackground  relative shadow-xl rounded-3xl p-8 max-w-2xl w-full flex flex-col items-center justify-center">
          
          <Image isBlurred alt="HeroUI Album Cover" className=" object-contain" src="no_img.png" width={240} />
          <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">{applicationData[]}</h2>
        </div>
      </div>
    </div>
  );
}

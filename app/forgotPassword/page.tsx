"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@heroui/react";
import FloatingLabelInput from "../components/FloatingLabelInput";
import Navbar from "../components/navbar";
import Link from "next/link";
import { Suspense } from "react";

export default function Login() {
  function CheckUserType() {
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get("admin") === "true";
    const [formData, setFormData] = useState({
      emailOrReg: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (isAdmin) {
        // Admin login logic
        console.log("Admin Login:", formData);
        // Implement your admin authentication logic here
      } else {
        // User login logic
        console.log("User Login:", formData);
        // Implement your user authentication logic here
      }
    };
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-auto justify-center items-center w-full">
          <div className="bg-textBoxBackground relative shadow rounded-3xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">Forgot Password</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <h1 className="text-center">
                <span className="text-muthootRed">* </span>We will resend the the credentials to your registered email id
              </h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <FloatingLabelInput id="emailOrReg" label={isAdmin ? "Email Address" : "Registration Number"} type={isAdmin ? "email" : "number"} required autoComplete={isAdmin ? "email" : "username"} value={formData.emailOrReg} onChange={handleChange} />
              </div>

              <Button type="submit" className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                Submit
              </Button>
            </form>
            <div className="h-[40px] w-full flex justify-end items-end">
              <Link href={isAdmin ? "/login?admin=true" : "/login"} className="absolute bottom-1 right-0 m-4">
                {isAdmin ? "Admin Login" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Suspense>
      <CheckUserType />
    </Suspense>
  );
}

"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import FloatingLabelInput from "../components/FloatingLabelInput";
import Navbar from "../components/navbar";
import Link from "next/link";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    // logic to send OTP to email
    console.log("Sending OTP to:", formData.email);
    // senting OTP
    setStep(2);
  };

  const handleValidateOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    // logic to validate the OTP
    console.log("Validating OTP:", formData.otp);
    setStep(3);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // logic to change the password
    console.log("Changing password to:", formData.newPassword);
    // password change
    alert("Password changed successfully!");
    // redirect to login page
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background md:w-full w-[70%] m-auto">
      <Navbar />
      <div className="flex flex-auto justify-center items-center w-full">
        <div className="bg-textBoxBackground relative shadow rounded-3xl p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">Forgot Password</h2>
          {step === 1 && (
            <form className="space-y-6" onSubmit={handleSendOTP}>
              <h1 className="text-center">
                <span className="text-muthootRed">* </span>We will send an OTP to your registered email ID
              </h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <FloatingLabelInput
                  id="email"
                  label="Email Address"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                Send OTP
              </Button>
            </form>
          )}
          {step === 2 && (
            <form className="space-y-6" onSubmit={handleValidateOTP}>
              <h1 className="text-center">
                <span className="text-muthootRed">* </span>Enter the OTP sent to your email
              </h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <FloatingLabelInput
                  id="otp"
                  label="OTP"
                  type="text"
                  required
                  autoComplete="one-time-code"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                Validate OTP
              </Button>
            </form>
          )}
          {step === 3 && (
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <h1 className="text-center">
                <span className="text-muthootRed">* </span>Enter your new password
              </h1>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <FloatingLabelInput
                  id="newPassword"
                  label="New Password"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={formData.newPassword}
                  onChange={handleChange}
                />
              </div>
              <Button type="submit" className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                Change Password
              </Button>
            </form>
          )}
          <div className="h-[40px] w-full flex justify-end items-end">
            <Link href="/login" className="absolute bottom-1 m-4">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

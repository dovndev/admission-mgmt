"use client";
import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FloatingLabelInput from "../components/FloatingLabelInput";
import Navbar from "../components/navbar";
import Link from "next/link";
import {  Button } from "@heroui/react";
import {
  isSessonActive,
  loginAction,
  loginAdmin,
} from "../actions/auth-actions";
import CustomToast from "../components/CustomToast";
export default function LoginPage() {
  function CheckUserType() {
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get("admin") === "true";

    const [formData, setFormData] = useState({
      emailOrReg: "",
      password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      CustomToast({title: "Logging in", description: ""});

      if (isAdmin) {
        // Admin login logic
        console.log("Admin Login:", formData);
        const response = await loginAdmin({
          email: formData.emailOrReg,
          password: formData.password,
        });
        console.log(response);
        // Implement your admin authentication logic here
      } else {
        // User login logic
        // console.log("User Login:", formData);
        const response = await loginAction({
          email: formData.emailOrReg,
          password: formData.password,
        });
        console.log(response);
        // Implement your user authentication logic here
      }
    };

    useEffect(() => {
      (async () => {
        const isActive = await isSessonActive();
        if (isActive) {
          console.log("User is already logged in");
        } else {
          console.log("User is not logged in");
        }
      })();
    }, []);

    return (
      <Suspense>
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <Navbar />
          <div className="flex flex-auto justify-center items-center w-full">
            <div className="bg-textBoxBackground relative shadow rounded-3xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">
                {isAdmin ? "Admin Login" : "Login"}
              </h2>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <FloatingLabelInput
                    id="emailOrReg"
                    label={isAdmin ? "Email Address" : "Registration Number"}
                    type={"email"}
                    required
                    autoComplete={"email"}
                    value={formData.emailOrReg}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <FloatingLabelInput
                    id="password"
                    type="password"
                    label="Password"
                    required
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Submit
                </Button>
              </form>
              <div className="h-[40px] w-full flex justify-end items-end">
                <Link
                  href={
                    isAdmin ? "/forgotPassword?admin=true" : "/forgotPassword"
                  }
                  className="border-b mauto"
                >
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
          <Link
            href={isAdmin ? "/login" : "/login?admin=true"}
            className="absolute bottom-1 right-0 m-4 "
          >
            {isAdmin ? "Login" : "Admin Login"}
          </Link>
        </div>
      </Suspense>
    );
  }
  return (
    <Suspense>
      <CheckUserType />
    </Suspense>
  );
}

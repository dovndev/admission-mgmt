// app/forgotpassword/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { requestPasswordReset } from "../actions/auth-actions";
import CustomToast from "../components/CustomToast";
import Navbar from "../components/navbar";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await requestPasswordReset(email);

      if (response.success) {
        CustomToast({
          title: "Success",
          description: "Password reset link has been sent to your email",
        });
        // Redirect to login after a delay
        setTimeout(() => router.push("/login"), 3000);
      } else {
        CustomToast({
          title: "Error",
          description: response.error || "Failed to send reset link",
        });
      }
    } catch {
      CustomToast({
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-auto justify-center items-center w-full">
        <div className="bg-textBoxBackground relative shadow rounded-3xl p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">
            Reset Password
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <FloatingLabelInput
                id="email"
                label="Email Address"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
          <div className="h-[40px] w-full flex justify-end items-end">
            <Link href="/login" className="border-b mauto">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CustomToast from "../components/CustomToast";
import { resetPassword, validateResetToken } from "../actions/auth-actions";
import Navbar from "../components/navbar";
import FloatingLabelInput from "../components/FloatingLabelInput";

import Footer from "../components/Footer";
import { Button } from "@heroui/react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const tokenParam = searchParams.get("token");
      if (!tokenParam) {
        CustomToast({
          title: "Error",
          description: "Invalid reset link",
        });
        return;
      }

      setToken(tokenParam);

      try {
        const result = await validateResetToken(tokenParam);
        setIsValidToken(result.valid);

        if (!result.valid) {
          CustomToast({
            title: "Error",
            description: "This reset link is invalid or has expired",
          });
        }
      } catch {
        CustomToast({
          title: "Error",
          description: "Failed to validate reset token",
        });
      } finally {
        setIsChecking(false);
      }
    };

    checkToken();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      CustomToast({
        title: "Error",
        description: "Passwords do not match",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword(token, password);

      if (response.success) {
        CustomToast({
          title: "Success",
          description: "Your password has been reset successfully",
        });
        // Redirect to login after a delay
        setTimeout(() => router.push("/login"), 2000);
      } else {
        CustomToast({
          title: "Error",
          description: response.error || "Failed to reset password",
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

  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-auto justify-center items-center">
          <div className="text-xl">Verifying reset link...</div>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-auto justify-center items-center">
          <div className="text-xl text-red-500">
            This password reset link is invalid or has expired.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Navbar />
      <div className="flex flex-auto justify-center items-center w-full">
        <div className="bg-textBoxBackground relative shadow rounded-3xl p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-center text-muthootRed">
            Create New Password
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <FloatingLabelInput
                id="password"
                label="New Password"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FloatingLabelInput
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

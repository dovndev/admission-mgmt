"use client";
import React from "react";
import { Input } from "@heroui/input";
import { EyeClosedIcon,EyeIcon } from "lucide-react";
interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  value?: string;
  labelPlacement?:"inside" | "outside" | "outside-left";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  id,
  label,
  type = "text",
  onChange,
  value,
  required = false,
  autoComplete = "off",
  labelPlacement = "inside",
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      onWheel={(e) => (e.target as HTMLInputElement).blur()}
      onKeyDown={(e) => {
        if (
          type === "number" &&
          (e.key === "ArrowUp" || e.key === "ArrowDown")
        ) {
          e.preventDefault();
        }
      }}
      label={label}
      isRequired={required}
      id={id}
      type={isVisible ? "text" : type}
      value={value}
      autoComplete={autoComplete}
      required={required}
      variant="bordered"
      onChange={onChange}
      labelPlacement={labelPlacement}
      validate={
        id == "mobileNumber" || id == "contactNumber" || id == "contactNumberKerala"
          ? (value) => value.length === 10 || "Phone number must be 10 digits"
          : id == "aadharNo"
          ? (value) => value.length===0 || value.length === 12 || "Aadhar number must be 12 digits"
          : id == "pinCode" || id== "pinCodePermanent"
          ? (value) => value.length === 6 || " Pin Code must be 6 digits"
          : type=="password"
          ? (value) => value.length >= 8 || "Password must be atleast 8 characters"
          : undefined
      }
      placeholder={labelPlacement === 'outside' ? " ":""}
      endContent={
        type !== "password" ? null :
        <button
          aria-label="toggle password visibility"
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <EyeClosedIcon className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <EyeIcon className="text-2xl text-default-400 pointer-events-none mb-1" />
          )}
        </button>
      }
    />
  );
};

export default FloatingLabelInput;

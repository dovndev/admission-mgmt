"use client";
import React from "react";
import { Input } from "@nextui-org/input";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  value?: string;
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
}) => {
  return (
    // onWheel is used to stop incrimenting values while scrolling
    <Input
      onWheel={(e) => (e.target as HTMLInputElement).blur()}
      label={label}
      isRequired={required}
      id={id}
      type={type}
      value={value}
      autoComplete={autoComplete}
      required={required}
      variant="bordered"
      onChange={onChange}
      validate={
        id == "mobileNumber" || id == "contactNumber" || id == "contactNumberKerala"
          ? (value) => value.length === 10 || "Phone number must be 10 digits"
          : id == "aadharNo"
          ? (value) => value.length === 12 || "Aadhar number must be 12 digits"
          : id == "pinCode" || id== "pinCodePermanent"
          ? (value) => value.length === 6 || " Pin Code must be 6 digits"
          : undefined
      }
    />
  );
};

export default FloatingLabelInput;

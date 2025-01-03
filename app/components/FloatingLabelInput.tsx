"use client";
import React, { useState, FocusEvent, ChangeEvent } from "react";
import {Input} from "@nextui-org/input";
import { z } from "zod";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

const validateInput = (inputType: string, value: string): boolean => {
  let schema;
  let inputStringObject = z.string();
  switch (inputType) {
    case "email":
      schema = inputStringObject.email();
      break;
    default:
      schema = inputStringObject;
  }
  return schema.safeParse(value).success;
};

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id,label, type = "text", required = false, autoComplete = "off" }) => {
  const [isValid, setIsValid] = useState(true);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setIsValid(validateInput(id, value));
  };

  return (
    <div className="relative w-full">
      <Input
      label={label}
      isRequired={required}
      id={id}
      type={type}
      autoComplete={autoComplete}
      required={required}
      variant="bordered"
      onBlur={handleBlur}      
      />
    </div>
  );
};

export default FloatingLabelInput;
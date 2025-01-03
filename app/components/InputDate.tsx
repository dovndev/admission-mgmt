"use client";
import React, { useState } from "react";
import {DateInput} from "@nextui-org/react";

interface DateInputProps {
  id: string;
  required?: boolean;
  label: string;
}

const InputDate: React.FC<DateInputProps> = ({ id, label, required = false }) => {
  
  return (
    <div className="relative w-full">
      <DateInput
        isRequired
        label={"Birth date"}
        variant="bordered"
      />
    </div>
  );
};

export default InputDate;

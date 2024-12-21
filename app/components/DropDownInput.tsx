"use client";
import React, { useState } from "react";
import { Select ,SelectItem } from "@nextui-org/react";

interface DropDownInputProps {
  options: string[];
  id: string;
  label: string;
  required?: boolean;
}

const DropDownInput: React.FC<DropDownInputProps> = ({ options, id, label, required = false }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="relative w-full">
      <Select
        
        label={label}
        className="w-full"
        variant="bordered"
        isRequired={required}
      >
        {options.map((option, index) => (
          <SelectItem  key={index}>
            {option}
          </SelectItem >
        ))}
      </Select>

    </div>
  );
};

export default DropDownInput;

"use client";
import React, { useState } from "react";

interface DropDownInputProps {
  options: string[];
  id: string;
  label: string;
  required?: boolean;
}

const DropDownInput: React.FC<DropDownInputProps> = ({ options, id, label, required = false }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => setIsFocused(e.target.value !== "");
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div className="relative w-full">
      <select value={selectedOption} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={`peer text-white bg-textBoxBackground w-full border-2 border-white rounded-md px-3 pt-5 pb-2 text-sm `}>
        <option value="" disabled hidden></option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-3 text-sm text-white transition-all duration-200 
          ${isFocused || value ? "text-xs -top-2 bg-textBoxBackground px-1" : "top-4 text-red-500"}`}
      >
        {label} {required && <span className="text-red-500"> * </span>}
      </label>
    </div>
  );
};

export default DropDownInput;

"use client";
import React, { useState, FocusEvent, ChangeEvent } from "react";

interface FloatingLabelInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}
const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ id, label, type = "text", required = false,autoComplete = "off" }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => setIsFocused(e.target.value !== "");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  return (
    <div className="relative w-full">
      <input id={id} type={type} value={value} autoComplete={autoComplete} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} className={`peer text-white bg-textBoxBackground w-full border-2 border-white rounded-md px-3 pt-5 pb-2 text-sm `} />
      <label
        htmlFor={id}
        className={`absolute left-3 text-sm text-white transition-all duration-200 
          ${isFocused || value ? "text-xs -top-2 bg-textBoxBackground px-1" : "top-4 text-red-500"}`}>
        
        {label} {required && <span className="text-red-500"> * </span>}
      </label>
    </div>
  );
};

export default FloatingLabelInput;

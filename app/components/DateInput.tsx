"use client";
import React, { useState } from "react";

interface DateInputProps {
  id: string;
  required?: boolean;
  label: string;
}

const DateInput: React.FC<DateInputProps> = ({ id, label, required = false }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const handleFocus = () => setIsFocused(true);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  return (
    <div className="relative w-full">
      <div>
        <input type="date" className={`peer text-white bg-textBoxBackground w-full border-2 border-white rounded-md px-3 pt-5 pb-2 text-sm `} />
      </div>
      <label
        htmlFor={id}
        className={"absolute left-3 text-white text-xs -top-2 bg-textBoxBackground px-1"}
      >
        {label} {required && <span className="text-red-500"> * </span>}
      </label>
    </div>
  );
};

export default DateInput;

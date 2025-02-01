"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

interface DropDownInputProps {
  options: string[];
  id: string;
  label: string;
  required?: boolean;
  value?: string;
  labelPlacement?:"inside" | "outside" | "outside-left";
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropDownInput: React.FC<DropDownInputProps> = ({ options, id, label, required = false,onChange ,  labelPlacement = "inside",
}) => {

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const event = {
        target: { id, value: options[Number(e.target.value)] },
      } as unknown as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  return (
    <Select label={label} id={id} className="w-full" variant="bordered" isRequired={required} onChange={handleSelect} labelPlacement={labelPlacement}       placeholder={labelPlacement === 'outside' ? " ":""}
>
      {options.map((option, index) => (
        <SelectItem key={index}>{option}</SelectItem>
      ))}
    </Select>
  );
};

export default DropDownInput;

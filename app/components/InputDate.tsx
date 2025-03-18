"use client";
import React from "react";
import { DatePicker } from "@heroui/date-picker";
import {parseDate} from "@internationalized/date";
import { DateValue } from "@react-types/datepicker";

interface DatePickerProps {
  id: string;
  required?: boolean;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputDate: React.FC<DatePickerProps> = ({ id, label, required = false, value,onChange }) => {
  const handleDateChange = (date: DateValue | null) => {
    if (date && onChange) {
      const event = {
        target: { id, value: date.toString() },
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <DatePicker
      isRequired={required}
      id={id}
      label={label}
      defaultValue={value ? parseDate(value): null}
      variant="bordered"
      onChange={handleDateChange}
    />
  );
};

export default InputDate;

"use client";
import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";

interface FileUploadInputProps {
  id: string;
  required?: boolean;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

}



const FileUploadInput: React.FC<FileUploadInputProps> = ({
  id,
  label,
  required = false,
}) => {
  const [error, setError] = useState<string>("");
  const [isInvalid, setInvalid] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
 
    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setError("Only JPEG and PNG files are allowed.");
        setInvalid(true);
        return;
      }

      if (file.size > maxSize) {
        setError("File size must be less than 2MB.");
        setInvalid(true);
        return;
      }

      setError("");
      setInvalid(false);

    } else {
      setError("");
      setInvalid(true);
    }
  };
  return (
    <div id={id} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5">
      <Input type="file" accept=".jpeg, .png" isInvalid={isInvalid} errorMessage={error} variant="bordered" isRequired={required} onChange={handleFileChange} className="" label={label} />

      <Button type="button" className="w-full sm:w-2 bg-muthootRed text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
        Upload
      </Button>
    </div>
  );
};

export default FileUploadInput;

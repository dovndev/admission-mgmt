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

const FileUploadInput: React.FC<FileUploadInputProps> = ({ id, label, required = false }) => {
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
    <div id={id} className="flex flex-row items-center gap-4">
      <Input
      type="file"
      accept=".jpeg, .png"
      isInvalid={isInvalid}
      errorMessage={error}
      variant="bordered"
      isRequired={required}
      onChange={handleFileChange}
      label={label}
      />
      <Button type="button" color="warning" variant="ghost" className="mt-5">
      UPLOAD
      </Button>
    </div>
  );
};

export default FileUploadInput;

"use client";
import { Input, Button } from "@heroui/react";
import React, { useState, useRef } from "react";
import { uploadFile } from "../actions/file-upload-Actions";

interface FileUploadInputProps {
  id: string;
  required?: boolean;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFileLink?: (fileLink: string) => void;
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  id,
  label,
  required = false,
  onChange,
  setFileLink,
}) => {
  const [error, setError] = useState<string>("");
  const [isInvalid, setInvalid] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);

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
      setUploadStatus(`Selected: ${file.name}`);
    } else {
      setError("");
      setInvalid(true);
      setUploadStatus("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("No file selected.");
      setInvalid(true);
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await uploadFile(formData);
      console.log("upload result", result);
      if (result && result.success) {
        setUploadStatus("Upload successful!");
        if (setFileLink) {
          setFileLink(result.url);
        }

        // Notify parent component about the uploaded file
        if (onChange) {
          onChange({
            target: {
              value: result.url,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }
      } else {
        setError("Upload failed");
        setInvalid(true);
        setUploadStatus("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Upload failed. Please try again.");
      setInvalid(true);
      setUploadStatus("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div id={id} className="flex flex-row items-center gap-4">
        <Input
          ref={fileInputRef}
          type="file"
          accept=".jpeg, .jpg, .png"
          isInvalid={isInvalid}
          errorMessage={error}
          variant="bordered"
          isRequired={required}
          onChange={handleFileChange}
          label={label}
        />
        <Button
          onPress={handleUpload}
          type="button"
          color="warning"
          variant="ghost"
          className=""
          isLoading={isUploading}
          isDisabled={!selectedFile || isUploading}
        >
          UPLOAD
        </Button>
      </div>
      {uploadStatus && (
        <div
          className={`text-sm ${isInvalid ? "text-red-500" : "text-green-600"}`}
        >
          {uploadStatus}
        </div>
      )}
    </div>
  );
};

export default FileUploadInput;

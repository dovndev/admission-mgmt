"use client";

import { addToast } from "@heroui/react";


interface CustomToastProps {
  title?: string;
  description?: string;
}

export default function CustomToast({
  title = "",
  description = "",
}: CustomToastProps) {

    addToast({
      title,
      description,
      radius : "lg",
      variant: "flat",
      timeout: 2500,
    });


  return null;
}

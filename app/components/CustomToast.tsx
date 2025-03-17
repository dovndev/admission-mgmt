"use client";

import { addToast } from "@heroui/react";


interface CustomToastProps {
  title?: string;
  description?: string;
}

export default function CustomToast({
  title = "Toast title",
  description = "Toast displayed successfully",
}: CustomToastProps) {

    addToast({
      title,
      description,
      radius : "lg",
      variant: "flat"
    });


  return null;
}

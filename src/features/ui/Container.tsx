"use client";

import clsx from "clsx";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  variant?: "default" | "panel";
}

export default function Container({ children, variant = "default" }: ContainerProps) {
  const containerClasses = clsx("w-full  h-full  flex flex-1 bg-surface", {
    "items-start justify-start p-0 bg-surface  ": variant === "panel",
    "flex-col  items-center justify-center px-6 py-10 ": variant === "default"
  });

  return <div className={containerClasses}>{children}</div>;
}

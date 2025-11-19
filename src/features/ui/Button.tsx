"use client";

import clsx from "clsx";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "primary" | "outline" | "close";
  href?: string;
  onClick?: () => void;
}

export default function Button({
  label,
  variant = "primary",
  href,
  className,
  onClick,
  ...props
}: ButtonProps) {
  const baseClass = clsx(
    "px-5 py-2 rounded-lg transition duration-300 ease-in-out text-sm sm:text-base font-normal  cursor-pointer min-w-fit h-fit",
    {
      "bg-[#C9A7F5] text-surface hover:bg-[#A78BFA] hover:text-surface/80": variant === "primary",

      "border border-[#C9A7F5] text-primaryHover hover:bg-[#F5E9FF] hover:text-[#1F2937] hover:border-transparent":
        variant === "outline",

      "bg-error text-white hover:bg-error/80": variant === "close"
    },
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClass} onClick={onClick}>
        {label}
      </a>
    );
  }

  return (
    <button {...props} className={baseClass} onClick={onClick}>
      {label}
    </button>
  );
}

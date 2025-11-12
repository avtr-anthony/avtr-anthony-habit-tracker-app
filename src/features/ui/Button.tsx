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
    "px-4 py-1 rounded-lg transition duration-300 ease-in-out text-sm sm:text-base font-medium cursor-pointer min-w-fit h-fit",
    {
      "bg-surface text-primary hover:opacity-90": variant === "primary",
      "border border-white text-white hover:bg-surface hover:text-primary": variant === "outline",
      "bg-error text-surface hover:bg-errorHover": variant === "close"
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

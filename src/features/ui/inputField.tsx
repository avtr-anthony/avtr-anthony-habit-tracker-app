"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  name,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex w-full flex-col">
      <label
        htmlFor={name}
        className="text-textSecondary mb-1 text-sm font-medium"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="border-border focus:ring-primary w-full rounded-lg border p-2 pr-10 transition focus:ring-2 focus:outline-none sm:p-3"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textSecondary hover:text-primary"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

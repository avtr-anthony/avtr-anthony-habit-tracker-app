"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  name?: string;
  maxLength?: number;
  pattern?: string;
  defaultValue?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  name,
  maxLength,
  pattern,
  defaultValue = ""
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const [value, setValue] = useState(defaultValue);

  // Manejo de patter y restricciones en inputs
  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const val = ev.target.value;

    if (pattern) {
      const regex = new RegExp(pattern);
      if (regex.test(val) || val === "") setValue(val);
    } else {
      setValue(val);
    }
  }

  return (
    <div className="flex w-full flex-col">
      <label htmlFor={name} className="text-textSecondary mb-1 text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
          value={value}
          onChange={handleChange}
          className="border-border focus:ring-primary w-full rounded-lg border p-2 pr-10 capitalize transition focus:ring-2 focus:outline-none sm:p-3"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-textSecondary hover:text-primary absolute top-1/2 right-3 -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
}

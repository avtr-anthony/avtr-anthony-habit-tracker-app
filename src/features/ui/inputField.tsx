"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Props del input
export interface InputFieldProps {
  id?: string; // ID del input
  label?: string; // Etiqueta del input
  type?: string; // Tipo de input (text, password, email, etc.)
  placeholder?: string; // Placeholder
  name?: string; // Nombre del input
  maxLength?: number; // Longitud máxima
  pattern?: string; // Patrón de validación
  defaultValue?: string; // Valor por defecto
}

// Componente funcional InputField
export default function InputField({
  id,
  label,
  type = "text",
  placeholder = "",
  name,
  maxLength,
  pattern,
  defaultValue = ""
}: InputFieldProps) {
  const inputId = id || name; // Usa el ID proporcionado o el nombre como ID
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const isPassword = type === "password"; // Determina si es un input de contraseña
  const [value, setValue] = useState(defaultValue); // Estado del valor del input

  // Manejo de cambios en el input con validación de patrón
  function handleChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const val = ev.target.value;

    if (pattern) {
      const regex = new RegExp(pattern);
      if (regex.test(val) || val === "") setValue(val); // Solo aceptar si cumple patrón o está vacío
    } else {
      setValue(val); // Si no hay patrón, aceptar cualquier valor
    }
  }

  return (
    <div className="flex w-full flex-col">
      {label && (
        <label htmlFor={inputId} className="text-textSecondary mb-1 text-sm font-medium">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Input principal */}
        <input
          id={inputId}
          name={name}
          type={isPassword && showPassword ? "text" : type} // Mostrar texto si se activa showPassword
          placeholder={placeholder}
          maxLength={maxLength}
          pattern={pattern}
          value={value}
          onChange={handleChange}
          className="border-border/20 focus:ring-primary w-full rounded-lg border p-2 pr-10 transition focus:border-transparent focus:ring-2 focus:outline-none sm:p-3"
        />

        {/* Botón para mostrar/ocultar contraseña */}
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

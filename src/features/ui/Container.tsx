"use client";

import clsx from "clsx";
import React from "react";

// Props del contenedor
interface ContainerProps {
  children: React.ReactNode; // Elementos hijos dentro del contenedor
  variant?: "default" | "panel"; // Variante del contenedor: panel o default
}

// Componente funcional Container
export default function Container({ children, variant = "default" }: ContainerProps) {
  // Clases dinámicas según la variante
  const containerClasses = clsx(
    "w-full  h-fit  flex flex-1 bg-linear-to-br from-slate-200 via-slate-100 to-slate-300 md:overflow-hidden background-gradient  ",
    {
      "items-start justify-start p-0 bg-surface  ": variant === "panel", // Estilo para panel
      "flex-col  items-center justify-center  ": variant === "default" // Estilo por defecto
    }
  );

  return (
    <div className={containerClasses}>
      {/* Wrapper interno para aplicar padding y fondo */}
      <div className="background-image h-full w-full px-6 py-6">{children}</div>
    </div>
  );
}

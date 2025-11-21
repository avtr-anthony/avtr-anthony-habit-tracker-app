"use client";

import clsx from "clsx";
import Logo from "@/features/ui/Logo";
import Button from "@/features/ui/Button";
import { useGetUsername } from "@/hooks/useGetUsername";

// Interfaz para los botones del header
interface HeaderButton {
  label: string; // Texto del botón
  href?: string; // Enlace opcional
  variant?: "primary" | "outline" | "close"; // Estilo del botón
}

// Props del header
interface HeaderProps {
  variant?: "hDefault" | "hPanel"; // Variante del header
  showUser?: boolean; // Mostrar usuario logueado
  buttons?: HeaderButton[]; // Lista de botones a mostrar
  onClick?: () => void; // Función de logout
}

// Componente funcional Header
export default function Header({
  variant = "hDefault",
  showUser = false,
  buttons = [],
  onClick
}: HeaderProps) {
  // Obtener el nombre de usuario mediante hook
  const username = useGetUsername();

  // Clases dinámicas según variante del header
  const headerClass = clsx(
    "w-full bg-surface/40 backdrop-blur-xl shadow-lg text-surface  z-1 p-4 sm:px-6 md:px-8 flex",
    variant === "hDefault"
      ? " flex-col items-start justify-start gap-2 md:gap-0 md:flex-row md:items-center md:justify-between "
      : "flex-col items-start"
  );

  return (
    <header className={headerClass}>
      {/* Logo de la aplicación */}
      <Logo />

      {/* Botones de navegación */}
      <div className="flex w-full items-center justify-start gap-2 md:justify-end">
        {buttons.map((btn, i) => (
          <Button key={i} label={btn.label} href={btn.href} variant={btn.variant} />
        ))}
      </div>

      {/* Sección para panel con usuario logueado */}
      {variant === "hPanel" && showUser && (
        <div className="flex w-full items-center justify-between">
          <p className="text-text! text-xl font-bold md:text-3xl">
            Hola, <span className="text-primaryHover">{username}</span>
          </p>
          <Button label="Cerrar Sesión" onClick={onClick} variant="close" />
        </div>
      )}
    </header>
  );
}

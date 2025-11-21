import Link from "next/link";
import clsx from "clsx";

// Props del componente Button
export interface ButtonProps {
  label: string; // Texto del botón
  href?: string; // Enlace si es un Link
  onClick?: () => void; // Función a ejecutar al hacer click
  variant?: "primary" | "secondary" | "outline"; // Estilo del botón
  type?: "button" | "submit"; // Tipo de botón (para formularios)
}

// Componente funcional Button
export default function Button({
  label,
  href,
  onClick,
  variant = "primary",
  type = "button"
}: ButtonProps) {
  // Clases dinámicas según el tipo de botón
  const classes = clsx(
    "inline-flex justify-center items-center px-6 sm:px-7 py-3 rounded-lg font-medium text-sm sm:text-base transition focus:outline-none focus:ring-2 focus:ring-primary",
    {
      "bg-primary text-surface hover:bg-primaryHover cursor-pointer": variant === "primary",
      "bg-secondary text-white hover:opacity-90": variant === "secondary",
      "border border-primary text-primary hover:bg-primary hover:text-white": variant === "outline"
    }
  );

  // Si hay href, renderizar un Link
  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  // Botón estándar
  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  );
}

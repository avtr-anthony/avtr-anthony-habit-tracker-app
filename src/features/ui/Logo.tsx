import Link from "next/link";
import { NotebookPen } from "lucide-react";

// Componente funcional Logo
export default function Logo() {
  return (
    <div className="flex items-center">
      {/* Enlace al inicio de la app */}
      <Link
        href="/"
        className="text-text flex items-center gap-2 text-3xl font-black tracking-wide uppercase sm:text-4xl md:text-5xl"
      >
        {/* Icono del logo */}
        <NotebookPen className="h-7 w-7 sm:h-9 sm:w-9" />
        {/* Nombre de la app */}
        Habiario
      </Link>
    </div>
  );
}

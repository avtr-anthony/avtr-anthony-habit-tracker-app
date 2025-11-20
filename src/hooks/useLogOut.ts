"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authService";

// Hook personalizado para manejar logout de usuarios
export function useLogout() {
  const router = useRouter(); // Router de Next.js para redirección
  const [loading, setLoading] = useState(false); // Estado de carga del logout

  // Función para cerrar sesión
  async function logout() {
    setLoading(true); // Indicar que se está cerrando sesión
    try {
      await logoutUser(); // Llamada a Firebase para cerrar sesión

      // Eliminar cookie de token de autenticación
      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

      // Pequeña espera para animaciones u otros procesos
      await new Promise((resolve) => setTimeout(resolve, 700));

      // Redirigir a la página de login
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setLoading(false); // Terminar estado de carga si falla
    }
  }

  // Retorna la función logout y estado de carga
  return { logout, loading };
}

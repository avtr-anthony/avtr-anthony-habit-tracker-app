"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";
import { FirebaseError } from "firebase/app";

// Hook personalizado para manejar login de usuarios
export function useLogin() {
  const router = useRouter(); // Router de Next.js para redirección
  const [error, setError] = useState(""); // Estado para mensajes de error
  const [loading, setLoading] = useState(false); // Estado de carga

  // Función que maneja el submit del formulario
  async function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); // Evitar recarga de página
    setError(""); // Limpiar errores previos

    // Obtener datos del formulario
    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    // Validación de campos
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      setLoading(true); // Indicar que está cargando
      await loginUser(email, password); // Llamada a Firebase para iniciar sesión
      router.push("/habitos"); // Redirigir a la página de hábitos
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "email-not-verified") {
        setError(
          "Debes verificar tu correo antes de iniciar sesión. Revisa tu bandeja de entrada."
        );
      } else if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-credential":
            setError("Correo o contraseña incorrectos.");
            break;
          case "auth/missing-password":
            setError("Debes ingresar tu contraseña.");
            break;
          case "auth/invalid-email":
            setError("El formato del correo no es válido.");
            break;
          default:
            setError(
              "No se pudo iniciar sesión. Intenta nuevamente. !No olvides verificar tu correo electrónico!"
            );
        }
      } else {
        setError("Error desconocido.");
      }
    } finally {
      setLoading(false); // Termina estado de carga
    }
  }

  // Retorna estado y función de login para el componente
  return { error, loading, handleLogin };
}

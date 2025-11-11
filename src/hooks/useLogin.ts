"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/authService";
import { FirebaseError } from "firebase/app";

export function useLogin() {
  const router = useRouter();
  const [error, setError] = useState("");

  // Función principal para manejar el inicio de sesión
  async function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    // No reload y vaciamos errores previos
    ev.preventDefault();
    setError("");

    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    // Validación simple antes de enviar
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      // Intenta iniciar sesión con Firebase Auth
      await loginUser(email, password);
      // Redirige al panel de hábitos si todo sale bien
      router.push("/habitos");
    } catch (err: unknown) {
      // Manejo de errores específicos de Firebase
      if (err instanceof FirebaseError) {
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
            setError("No se pudo iniciar sesión. Intenta nuevamente.");
        }
      } else {
        // Error desconocido
        setError("Error desconocido.");
      }
    }
  }

  // Retorna el estado de error y la función de login
  return { error, handleLogin };
}

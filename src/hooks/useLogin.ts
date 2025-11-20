"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/authService";
import { FirebaseError } from "firebase/app";

export function useLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError("");

    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      setLoading(true);
      await loginUser(email, password);
      router.push("/habitos");
    } catch (err: unknown) {
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
        setError("Error desconocido.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { error, loading, handleLogin };
}

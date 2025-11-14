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
      const user = await loginUser(email, password);
      const token = await user.getIdToken();

      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });

      if (!res.ok) {
        setError("Error al verificar la sesión.");
        setLoading(false);
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 700));

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

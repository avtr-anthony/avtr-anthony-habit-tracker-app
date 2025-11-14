"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAndSaveUser } from "@/services/registerService";
import { FirebaseError } from "firebase/app";

export function useRegister() {
  const router = useRouter();
  const [error, setError] = useState("");

  // Función principal que maneja el registro del usuario
  async function handleRegister(ev: React.FormEvent<HTMLFormElement>) {
    // No reload y vaciamos errores previos
    ev.preventDefault();
    setError("");

    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const confPassword = String(form.get("confPassword"));
    const username = String(form.get("username"));

    if (!username.trim() || !email.trim() || !password.trim() || !confPassword.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
      setError("Usuario solo puede contener letras, números o _");
      return;
    }

    if (username.length < 3) {
      setError("Usuario debe contener al menos 3 caracteres");
      return;
    }

    if (password !== confPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      await registerAndSaveUser(username, email, password);

      router.push("/login");
    } catch (err: unknown) {
      // Manejo de errores de Firebase
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("Este correo ya está registrado. Intenta iniciar sesión.");
            break;
          case "auth/invalid-email":
            setError("El formato del correo no es válido.");
            break;
          case "auth/weak-password":
            setError("La contraseña debe tener al menos 8 caracteres.");
            break;
          default:
            setError("Error al registrar usuario. Intenta nuevamente.");
        }
      } else {
        setError("Error desconocido");
      }
    }
  }

  return { error, handleRegister };
}

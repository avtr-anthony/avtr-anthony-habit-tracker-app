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

    // campos vacíos
    if (!username.trim() || !email.trim() || !password.trim() || !confPassword.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    // formato del nombre de usuario
    if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
      setError("Usuario solo puede contener letras, números o _");
      return;
    }

    // longitud mínima del usuario
    if (username.length < 3) {
      setError("Usuario debe contener al menos 3 caracteres");
      return;
    }

    // contraseñas coinciden
    if (password !== confPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // longitud mínima de la contraseña
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    try {
      // Crea usuario en Firebase y lo guarda en Supabase (o DB)
      await registerAndSaveUser(username, email, password);

      // Redirige al login después de registrarse correctamente
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
        // Error no identificado
        setError("Error desconocido");
      }
    }
  }

  // Retorna el estado de error y la función que maneja el registro
  return { error, handleRegister };
}

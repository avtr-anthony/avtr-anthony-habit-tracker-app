"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerAndSaveUser } from "@/services/registerService";
import { FirebaseError } from "firebase/app";
import { logoutUser } from "@/lib/authService";

// Hook personalizado para manejar el registro de usuarios
export function useRegister() {
  const router = useRouter(); // Router de Next.js para redirección
  const [error, setError] = useState(""); // Estado para mensajes de error
  const [loading, setLoading] = useState(false);
  const allowedDomains = ["gmail.com", "hotmail.com", "outlook.com", "live.com", "yahoo.com"];

  // Función principal que maneja el registro del usuario
  async function handleRegister(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); // Evitar recarga de página
    setError(""); // Limpiar errores previos

    // Obtener datos del formulario
    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const confPassword = String(form.get("confPassword"));
    const username = String(form.get("username"));

    // Validaciones locales
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

    const domain = email.split("@")[1]?.toLowerCase();

    if (!domain || !allowedDomains.includes(domain)) {
      setError("Solo se permiten correos conocidos como Gmail, Hotmail, Outlook o Yahoo.");
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

    setLoading(true);

    try {
      // Registrar usuario en Firebase y guardar en DB
      await registerAndSaveUser(username, email, password);
      await logoutUser();

      // Redirigir a login tras registro exitoso
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
    } finally {
      setLoading(false);
    }
  }

  // Retorna estado de error y función de registro
  return { error, handleRegister, loading };
}

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail
} from "firebase/auth";

// Hook responsable de actualizar el correo del usuario autenticado.
// Flujo:
// 1) Reautentica al usuario pidiéndole su contraseña actual.
// 2) Llama a verifyBeforeUpdateEmail para que Firebase envíe un correo de verificación al nuevo email.
// 3) Sincroniza el cambio en la tabla de perfil (/api/profile).
// 4) Dispara un callback opcional onSuccess (para abrir modal, etc.).
export function useUpdateEmail(onSuccess?: () => void) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdateEmail(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formElement = ev.currentTarget; // Guardamos el <form> antes de hacer awaits.
    setMessage("");
    setLoading(true);

    if (!user) {
      setMessage("No hay sesión activa.");
      setLoading(false);
      return;
    }

    // Leemos nuevo correo y contraseña actual desde el formulario.
    const form = new FormData(formElement);
    const newEmail = String(form.get("email") ?? "").trim();
    const currentPassword = String(form.get("currentPassword") ?? "");

    if (!newEmail) {
      setMessage("Ingresa un nuevo correo.");
      setLoading(false);
      return;
    }

    if (!currentPassword) {
      setMessage("Debes ingresar tu contraseña actual.");
      setLoading(false);
      return;
    }

    try {
      // 1. Reautenticar al usuario con su contraseña actual (requerido para operaciones sensibles).
      const credential = EmailAuthProvider.credential(user.email ?? "", currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 2. Pedir a Firebase que envíe un correo de verificación al nuevo email.
      // El cambio de correo se aplica cuando el usuario hace clic en ese enlace.
      await verifyBeforeUpdateEmail(user, newEmail);

      // 3. Actualizar el email también en la base de datos propia (tabla users).
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail })
      });

      if (!res.ok) {
        // Si el backend indica conflicto, mostramos mensaje específico.
        if (res.status === 409) {
          setMessage("Este correo ya está registrado en otra cuenta.");
          return;
        }

        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { error?: string }).error ?? "No se pudo actualizar el correo en BD"
        );
      }

      setMessage(
        "Te enviamos un correo de verificación al nuevo email. Debes confirmarlo desde ese enlace."
      );
      if (onSuccess) onSuccess(); // Permite que la pantalla muestre un modal o cierre sesión, etc.
      formElement.reset();
    } catch (error: unknown) {
      console.error(error);
      const err = error as { code?: string };

      // Códigos típicos de Firebase Auth relacionados con esta operación.
      if (err.code === "auth/requires-recent-login") {
        setMessage("Debes volver a iniciar sesión para cambiar el correo.");
      } else if (err.code === "auth/email-already-in-use") {
        setMessage("Este correo ya está registrado en otra cuenta.");
      } else {
        setMessage("Error al actualizar el correo.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, message, handleUpdateEmail };
}

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";

// Hook responsable de actualizar la contraseña del usuario autenticado.
// Flujo:
// 1) Comprueba contraseña actual, nueva y confirmación (validaciones básicas).
// 2) Reautentica al usuario con la contraseña actual.
// 3) Llama a updatePassword con la nueva contraseña.
// 4) Ejecuta opcionalmente onSuccess (por ejemplo, abrir un modal de re-login).
export function useUpdatePassword(onSuccess?: () => void) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdatePassword(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formElement = ev.currentTarget; // Guardamos el formulario antes de hacer awaits.
    setMessage("");
    setLoading(true);

    if (!user) {
      setMessage("No hay sesión activa.");
      setLoading(false);
      return;
    }

    // Leemos contraseña actual, nueva y confirmación desde el formulario.
    const form = new FormData(formElement);
    const currentPassword = String(form.get("currentPassword") ?? "");
    const newPassword = String(form.get("password") ?? "");
    const confirmPassword = String(form.get("confirmPassword") ?? "");

    if (!currentPassword) {
      setMessage("Debes ingresar tu contraseña actual.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    try {
      // 1. Reautenticar con la contraseña actual (requisito de Firebase para cambios sensibles).
      const credential = EmailAuthProvider.credential(user.email ?? "", currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 2. Actualizar la contraseña en Firebase Auth.
      await updatePassword(user, newPassword);
      setMessage("Contraseña actualizada correctamente.");
      formElement.reset();
      if (onSuccess) onSuccess();
    } catch (error: unknown) {
      console.error(error);
      const err = error as { code?: string };
      if (err.code === "auth/requires-recent-login") {
        setMessage("Debes volver a iniciar sesión para cambiar la contraseña.");
      } else {
        setMessage("Error al actualizar la contraseña.");
      }
    } finally {
      setLoading(false);
    }
  }

  return { loading, message, handleUpdatePassword };
}

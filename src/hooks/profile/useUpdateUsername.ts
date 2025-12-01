"use client";

import { useState } from "react";

// Hook responsable de actualizar el nombre de usuario en la API interna.
// Expone:
// - loading: indica si hay una petición en curso.
// - message: feedback de éxito / error para mostrar en la UI.
// - handleUpdateUsername: handler para el submit del formulario.
export function useUpdateUsername() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdateUsername(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formElement = ev.currentTarget; // Guardamos la referencia del form antes de hacer await.
    setMessage("");
    setLoading(true);

    // Leemos el valor actual del input "username" desde el formulario.
    const form = new FormData(formElement);
    const newUsername = String(form.get("username") ?? "").trim();

    // Validación mínima: no permitir string vacío.
    if (!newUsername) {
      setMessage("Ingresa un nuevo nombre de usuario.");
      setLoading(false);
      return;
    }

    try {
      // Llamada a la API interna que actualiza el perfil en la base de datos.
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newUsername })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "No se pudo actualizar el usuario");
      }

      setMessage("Nombre de usuario actualizado correctamente.");
      formElement.reset(); // Limpiar el formulario tras el éxito.
    } catch (error: unknown) {
      console.error(error);
      setMessage("Error al actualizar el nombre de usuario.");
    } finally {
      setLoading(false);
    }
  }

  return { loading, message, handleUpdateUsername };
}

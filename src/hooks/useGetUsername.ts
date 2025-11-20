"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/apiClient";

// Interfaz de respuesta esperada de la API
interface UsernameResponse {
  username: string;
}

// Hook personalizado para obtener el username del usuario logueado
export function useGetUsername() {
  const { user } = useAuth(); // Obtener el usuario desde el contexto de auth
  const [username, setUsername] = useState(""); // Estado local del username

  useEffect(() => {
    if (!user) {
      setUsername(""); // Si no hay usuario, limpiar el estado
      return;
    }

    // Función asíncrona autoejecutable para llamar a la API
    (async () => {
      try {
        // Llamada a la API para obtener username por UID
        const data = await apiFetch<UsernameResponse>(`/api/profile?uid=${user.uid}`);
        setUsername(data.username); // Guardar username en el estado
      } catch {
        setUsername(""); // En caso de error, limpiar el estado
      }
    })();
  }, [user]); // Se ejecuta cada vez que cambia el usuario

  return username; // Retorna el username
}

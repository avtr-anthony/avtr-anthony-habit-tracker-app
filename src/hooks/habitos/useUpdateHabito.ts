"use client";
import { updateHabito } from "@/services/habitosService";
import { useState } from "react";

interface UpdateHabitoPayload {
  descripcion?: string;
  label?: string;
  fecha?: string;
  completado?: boolean;
}

export function useUpdateHabito() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(id: string, payload: UpdateHabitoPayload) {
    setError("");
    setLoading(true);

    try {
      const habitoActualizado = await updateHabito(id, payload);
      return habitoActualizado;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido al actualizar hábito");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { handleUpdate, error, loading };
}

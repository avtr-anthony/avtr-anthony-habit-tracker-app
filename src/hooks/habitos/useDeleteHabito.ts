"use client";
import { deleteHabito } from "@/services/habitosService";
import { useState } from "react";

export function useDeleteHabito() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete(id: string) {
    setError("");
    setLoading(true);

    try {
      const resultado = await deleteHabito(id);
      return resultado;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido al eliminar hábito");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { handleDelete, error, loading };
}

"use client";
import { createHabito } from "@/services/habitosService";
import { useState } from "react";

export function useCreateHabito() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(ev.currentTarget);

    const descripcion = String(form.get("descripcion") || "");
    const label = String(form.get("label") || "");
    const fecha = String(form.get("fecha") || "");

    if (!label || !fecha || !descripcion) {
      setError("Completa los campos");
      setLoading(false);
      return null;
    }

    try {
      const nuevoHabito = await createHabito({
        descripcion,
        label,
        fecha
      });

      return nuevoHabito;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido al crear hábito");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { handleCreate, error, loading };
}

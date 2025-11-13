"use client";
import { createHabito } from "@/services/habitosService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useCreateHabito() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);

    const form = new FormData(ev.currentTarget);

    const descripcion = String(form.get("descripcion") || "");
    const label = String(form.get("label") || "");
    const fecha = String(form.get("fecha") || "");
    const hora = String(form.get("hora") || "");

    if (!label || !fecha || !hora) {
      setError("Completa los campos");
      setLoading(false);
      return;
    }

    try {
      await createHabito({
        descripcion,
        label,
        fecha,
        hora
      });

      router.push("/habitos");
      return "success";
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al crear habito");
      }
    } finally {
      setLoading(false);
    }
  }

  return { handleCreate, error, loading };
}

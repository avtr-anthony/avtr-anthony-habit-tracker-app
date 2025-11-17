"use client";

import { useState } from "react";
import { useCreateHabito } from "./useCreateHabitos";
import { useUpdateHabito } from "./useUpdateHabito";
import { Habito } from "@/types/Habito";

interface UseFormHabitoProps {
  onSuccess?: () => void;
  habito?: Habito | null;
}

export function useFormHabitos({ onSuccess, habito }: UseFormHabitoProps) {
  const { handleCreate, error: createError, loading: createLoading } = useCreateHabito();
  const { handleUpdate, error: updateError, loading: updateLoading } = useUpdateHabito();
  const [localError, setLocalError] = useState("");

  const isEditMode = Boolean(habito?.id_habito);
  const error = localError || (isEditMode ? updateError : createError);
  const loading = isEditMode ? updateLoading : createLoading;

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLocalError("");

    if (isEditMode && habito?.id_habito) {
      const form = new FormData(ev.currentTarget);
      const descripcion = String(form.get("descripcion") || "");
      const label = String(form.get("label") || "");
      const fecha = String(form.get("fecha") || "");

      if (!label || !fecha || !descripcion) {
        setLocalError("Completa los campos");
        return;
      }

      const result = await handleUpdate(habito.id_habito, {
        descripcion,
        label,
        fecha
      });

      if (result && onSuccess) {
        onSuccess();
      }
      return;
    }

    const result = await handleCreate(ev);
    if (result && onSuccess) {
      onSuccess();
    }
  }

  return {
    onSubmit,
    error,
    loading
  };
}

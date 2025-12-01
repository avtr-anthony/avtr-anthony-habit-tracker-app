"use client";

import { useState } from "react";
import { useCreateHabito } from "./useCreateHabitos";
import { useUpdateHabito } from "./useUpdateHabito";
import { Habito } from "@/types/Habito";

interface UseFormHabitoProps {
  onSuccess?: () => void; // Función a ejecutar cuando la operación finaliza correctamente
  habito?: Habito | null; // Si existe, el formulario funciona en modo edición
}

// Hook que maneja la lógica compartida del formulario de creación/edición de hábitos
export function useFormHabitos({ onSuccess, habito }: UseFormHabitoProps) {
  // Hooks que manejan crear o actualizar un hábito
  const { handleCreate, error: createError, loading: createLoading } = useCreateHabito();
  const { handleUpdate, error: updateError, loading: updateLoading } = useUpdateHabito();

  const [localError, setLocalError] = useState(""); // Error interno del formulario

  // Si existe id_habito → estamos en modo edición
  const isEditMode = Boolean(habito?.id_habito);

  // Error prioriza errores locales y luego errores del hook de create/update
  const error = localError || (isEditMode ? updateError : createError);

  // Loading depende si estamos creando o actualizando
  const loading = isEditMode ? updateLoading : createLoading;

  // Función central del formulario, maneja crear o actualizar según corresponda
  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLocalError("");

    // ------------------- MODO EDICIÓN -------------------
    if (isEditMode && habito?.id_habito) {
      const form = new FormData(ev.currentTarget);

      // Extraer datos del formulario
      const descripcion = String(form.get("descripcion") || "");
      const label = String(form.get("label") || "");
      const fecha = String(form.get("fecha") || "");

      // Validación básica de campos obligatorios
      if (!label || !fecha || !descripcion) {
        setLocalError("Completa los campos");
        return;
      }

      // Enviar actualización al backend
      const result = await handleUpdate(habito.id_habito, {
        descripcion,
        label,
        fecha
      });

      // Si fue exitoso ejecutar callback
      if (result && onSuccess) {
        onSuccess();
      }
      return;
    }

    // ------------------- MODO CREACIÓN -------------------
    const result = await handleCreate(ev);

    if (result && onSuccess) {
      onSuccess();
    }
  }

  // Expone al componente consumidor:
  return {
    onSubmit,
    error,
    loading
  };
}

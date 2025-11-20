"use client";
import { createHabito } from "@/services/habitosService";
import { useState } from "react";

// Hook para manejar la creación de un nuevo hábito
export function useCreateHabito() {
  const [error, setError] = useState(""); // Maneja mensajes de error
  const [loading, setLoading] = useState(false); // Indicador de carga mientras se crea el hábito

  // Función que procesa el formulario de creación de hábitos
  async function handleCreate(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); // Evita reload del formulario
    setError(""); // Limpia errores previos
    setLoading(true); // Activa estado de carga

    const form = new FormData(ev.currentTarget);

    // Valores del formulario
    const descripcion = String(form.get("descripcion") || "");
    const label = String(form.get("label") || "");
    const fecha = String(form.get("fecha") || "");

    // Validación simple: todos los campos son obligatorios
    if (!label || !fecha || !descripcion) {
      setError("Completa los campos");
      setLoading(false);
      return null; // Retorna null si falla validación
    }

    try {
      // Llama al servicio para crear un nuevo registro de hábito
      await createHabito({
        descripcion,
        label,
        fecha
      });

      // Si todo sale bien, indica éxito al componente
      return "success";
    } catch (err) {
      // Manejo de errores conocidos
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido al crear hábito");

      return null;
    } finally {
      setLoading(false); // Siempre detiene la carga, haya error o no
    }
  }

  // Retorna la función principal y estados manejados por el hook
  return { handleCreate, error, loading };
}

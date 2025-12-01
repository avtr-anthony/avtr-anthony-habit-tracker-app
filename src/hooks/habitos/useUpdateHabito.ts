"use client";
import { updateHabito } from "@/services/habitosService";
import { useState } from "react";

// Payload que contiene los campos actualizables de un hábito
interface UpdateHabitoPayload {
  descripcion?: string; // Texto descriptivo del hábito
  label?: string; // Título del hábito
  fecha?: string; // Fecha asociada al hábito
  completado?: boolean; // Estado de completado
}

// Hook encargado de manejar la actualización de un hábito
export function useUpdateHabito() {
  const [error, setError] = useState(""); // Guarda mensajes de error
  const [loading, setLoading] = useState(false); // Indica si se está actualizando

  // Función responsable de enviar los cambios de un hábito al backend
  async function handleUpdate(id: string, payload: UpdateHabitoPayload) {
    setError(""); // Limpia errores previos
    setLoading(true); // Activa el estado de carga

    try {
      // Llama al servicio que envía la actualización al API
      const habitoActualizado = await updateHabito(id, payload);
      return habitoActualizado; // Devuelve el hábito actualizado si tuvo éxito
    } catch (err) {
      // Manejo de errores específicos
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido al actualizar hábito");

      return null; // Retorna null cuando ocurre un error
    } finally {
      setLoading(false); // Siempre detiene la carga al finalizar
    }
  }

  // Devuelve función principal + estados útiles para UI
  return { handleUpdate, error, loading };
}

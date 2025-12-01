"use client";
import { deleteHabito } from "@/services/habitosService";
import { useState } from "react";

// Hook encargado de manejar la eliminación de un hábito
export function useDeleteHabito() {
  const [error, setError] = useState(""); // Estado para almacenar errores
  const [loading, setLoading] = useState(false); // Indica si la operación está en proceso

  // Función principal que elimina un hábito según su ID
  async function handleDelete(id: string) {
    setError(""); // Limpia errores previos
    setLoading(true); // Activa el estado de carga

    try {
      // Llama al servicio que ejecuta la eliminación en el backend
      const resultado = await deleteHabito(id);
      return resultado; // Devuelve el resultado al componente que lo llamó
    } catch (err) {
      // Manejo de errores conocidos
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido al eliminar hábito");

      return null; // Indica fallo
    } finally {
      setLoading(false); // Detiene la carga siempre, haya éxito o error
    }
  }

  // Se retorna la función junto con estados útiles para mostrar feedback en UI
  return { handleDelete, error, loading };
}

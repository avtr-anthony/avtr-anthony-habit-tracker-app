"use client";
import { useCallback, useEffect, useState } from "react";
import { getHabitos } from "@/services/habitosService";
import { Habito } from "@/types/Habito";

interface LoadHabitosOptions {
  customDate?: string;
  silent?: boolean;
}

// Hook encargado de cargar todos los hábitos del usuario
export function useCargaHabitos(date?: string) {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Función principal que obtiene hábitos desde el backend
  const cargarHabitos = useCallback(
    async (options?: LoadHabitosOptions) => {
      const { customDate, silent } = options ?? {};
      try {
        if (!silent) setLoading(true);
        const queryDate = customDate ?? date;
        const data = await getHabitos(queryDate ? { date: queryDate } : undefined);
        setHabitos(data.habitos || []);
      } catch (err) {
        console.error("Error cargando hábitos", err);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [date]
  );

  // Actualiza un hábito en memoria sin recargar toda la lista
  const updateHabitoLocal = useCallback((id: string, patch: Partial<Habito>) => {
    setHabitos((prev) => prev.map((h) => (h.id_habito === id ? { ...h, ...patch } : h)));
  }, []);

  useEffect(() => {
    cargarHabitos();
  }, [cargarHabitos]);

  return {
    habitos,
    loading,
    openModal,
    setOpenModal,
    cargarHabitos,
    updateHabitoLocal
  };
}

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
  const [habitos, setHabitos] = useState<Habito[]>([]); // Lista de hábitos cargados desde la API
  const [openModal, setOpenModal] = useState(false); // Controla si el modal de crear/editar está abierto
  const [loading, setLoading] = useState(true); // Estado de carga mientras se obtienen hábitos

  // Función principal que obtiene hábitos desde el backend
  const cargarHabitos = useCallback(
    async (options?: LoadHabitosOptions) => {
      const { customDate, silent } = options ?? {};
      try {
        if (!silent) setLoading(true); // Activa estado de carga
        const queryDate = customDate ?? date;
        const data = await getHabitos(queryDate ? { date: queryDate } : undefined); // Llama al servicio para obtener hábitos
        setHabitos(data.habitos || []); // Guarda hábitos (o array vacío por seguridad)
      } catch (err) {
        console.error("Error cargando hábitos", err); // Error de red o backend
      } finally {
        if (!silent) setLoading(false); // Finaliza estado de carga siempre
      }
    },
    [date]
  );

  // Cargar hábitos automáticamente al montar el componente
  useEffect(() => {
    cargarHabitos();
  }, [cargarHabitos]);

  // Expone estados y funciones al componente que lo use
  return {
    habitos, // Lista de hábitos
    loading, // Estado de carga
    openModal, // Estado del modal
    setOpenModal, // Controlador para abrir/cerrar modal
    cargarHabitos // Función para recargar hábitos manualmente
  };
}

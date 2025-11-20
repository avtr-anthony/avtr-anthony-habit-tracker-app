"use client";
import { useEffect, useState } from "react";
import { getHabitos } from "@/services/habitosService";
import { Habito } from "@/types/Habito";

// Hook encargado de cargar todos los hábitos del usuario
export function useCargaHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>([]); // Lista de hábitos cargados desde la API
  const [openModal, setOpenModal] = useState(false); // Controla si el modal de crear/editar está abierto
  const [loading, setLoading] = useState(true); // Estado de carga mientras se obtienen hábitos

  // Función principal que obtiene hábitos desde el backend
  async function cargarHabitos() {
    try {
      setLoading(true); // Activa estado de carga
      const data = await getHabitos(); // Llama al servicio para obtener hábitos
      setHabitos(data.habitos || []); // Guarda hábitos (o array vacío por seguridad)
    } catch (err) {
      console.error("Error cargando hábitos", err); // Error de red o backend
    } finally {
      setLoading(false); // Finaliza estado de carga siempre
    }
  }

  // Cargar hábitos automáticamente al montar el componente
  useEffect(() => {
    cargarHabitos();
  }, []);

  // Expone estados y funciones al componente que lo use
  return {
    habitos, // Lista de hábitos
    loading, // Estado de carga
    openModal, // Estado del modal
    setOpenModal, // Controlador para abrir/cerrar modal
    cargarHabitos // Función para recargar hábitos manualmente
  };
}

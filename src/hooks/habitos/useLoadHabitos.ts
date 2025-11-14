"use client";
import { useEffect, useState } from "react";
import { getHabitos } from "@/services/habitosService";
import { Habito } from "@/types/Habito";

export function useCargaHabitos() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  async function cargarHabitos() {
    try {
      setLoading(true);
      const data = await getHabitos();
      setHabitos(data.habitos || []);
    } catch (err) {
      console.error("Error cargando hábitos", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarHabitos();
  }, []);

  return {
    habitos,
    openModal,
    setOpenModal,
    cargarHabitos
  };
}

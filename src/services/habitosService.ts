import { Habito } from "@/types/Habito";

export async function createHabito(payload: { descripcion: string; label: string; fecha: string }) {
  const response = await fetch("/api/habitos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let message = "No se ha creado habito";

    try {
      const data = await response.json();
      if (data.error) message = data.error;
    } catch (_) {}

    throw new Error(message);
  }

  return await response.json();
}

interface GetHabitosResponse {
  habitos: Habito[];
}

export async function getHabitos(): Promise<GetHabitosResponse> {
  const response = await fetch("/api/habitos", {
    method: "GET"
  });
  if (!response.ok) {
    let message = "Error al obtener los hábitos";

    try {
      const data = await response.json();
      if (data.error) message = data.error;
    } catch (_) {}

    throw new Error(message);
  }

  return await response.json();
}

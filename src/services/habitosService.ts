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

interface UpdateHabitoPayload {
  descripcion?: string;
  label?: string;
  fecha?: string;
  completado?: boolean;
}

interface UpdateHabitoResponse {
  habito: Habito;
}

export async function updateHabito(
  id: string,
  payload: UpdateHabitoPayload
): Promise<UpdateHabitoResponse> {
  const response = await fetch(`/api/habitos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let message = "No se ha actualizado el hábito";

    try {
      const data = await response.json();
      if (data.error) message = data.error;
    } catch (_) {}

    throw new Error(message);
  }

  return await response.json();
}

interface DeleteHabitoResponse {
  message: string;
}

export async function deleteHabito(id: string): Promise<DeleteHabitoResponse> {
  const response = await fetch(`/api/habitos/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    let message = "No se ha eliminado el hábito";

    try {
      const data = await response.json();
      if (data.error) message = data.error;
    } catch (_) {}

    throw new Error(message);
  }

  return await response.json();
}

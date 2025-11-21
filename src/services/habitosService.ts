import { Habito } from "@/types/Habito";
import { apiFetch } from "@/lib/apiClient";

export interface GetHabitosResponse {
  habitos: Habito[];
}

export interface GetHabitosParams {
  date?: string;
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

interface DeleteHabitoResponse {
  message: string;
}

// Crear hábito
export async function createHabito(payload: { descripcion: string; label: string; fecha: string }) {
  return apiFetch<{ habito: Habito }>("/api/habitos", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

// Obtener hábitos
export async function getHabitos(params?: GetHabitosParams): Promise<GetHabitosResponse> {
  const query = params?.date ? `?date=${encodeURIComponent(params.date)}` : "";
  return apiFetch<GetHabitosResponse>(`/api/habitos${query}`);
}

// Actualizar hábito
export async function updateHabito(
  id: string,
  payload: UpdateHabitoPayload
): Promise<UpdateHabitoResponse> {
  return apiFetch<UpdateHabitoResponse>(`/api/habitos/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}

// Eliminar hábito
export async function deleteHabito(id: string): Promise<DeleteHabitoResponse> {
  return apiFetch<DeleteHabitoResponse>(`/api/habitos/${id}`, {
    method: "DELETE"
  });
}

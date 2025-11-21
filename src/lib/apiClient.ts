// Clase personalizada para manejar errores de API
export class ApiError extends Error {
  status: number; // Código de estado HTTP que causó el error

  constructor(message: string, status: number) {
    super(message); // Llama al constructor de Error con el mensaje
    this.status = status; // Guarda el status para manejarlo externamente
  }
}

// Función genérica para hacer peticiones HTTP y manejar respuestas
export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init, // Mezcla opciones adicionales si las hay
    headers: {
      "Content-Type": "application/json", // Todas las peticiones retornan JSON
      ...(init?.headers || {}) // En caso de headers personalizados
    }
  });

  let data: any = null;

  try {
    // Intentamos parsear siempre la respuesta como JSON
    data = await res.json();
  } catch {
    // Si falla el parseo, simplemente seguimos (posible respuesta vacía)
  }

  // Si la respuesta tiene error HTTP (status no 2xx)
  if (!res.ok) {
    const message =
      data?.error || // Si API devuelve "error"
      data?.message || // O usa "message"
      "Error en la petición"; // Mensaje por defecto

    // Lanza error personalizado con mensaje y status
    throw new ApiError(message, res.status);
  }

  // Retorna el contenido ya tipado como T
  return data as T;
}

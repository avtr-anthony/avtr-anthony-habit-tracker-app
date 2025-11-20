export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export async function apiFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {})
    }
  });

  let data: any = null;

  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const message = data?.error || data?.message || "Error en la petición";
    throw new ApiError(message, res.status);
  }

  return data as T;
}

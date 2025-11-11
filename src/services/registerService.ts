import { registerUser } from "@/lib/authService";

// Registro de usuario y guardado de datos /api/profile
export async function registerAndSaveUser(username: string, email: string, password: string) {
  const user = await registerUser(email, password);

  const response = await fetch("/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid: user.uid, email, username })
  });

  if (!response.ok) throw new Error("Error al guardar perfil");

  return user;
}

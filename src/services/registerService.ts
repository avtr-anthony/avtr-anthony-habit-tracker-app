import { registerUser } from "@/services/authService";
import { apiFetch } from "@/lib/apiClient";
import { sendEmailVerification } from "firebase/auth";

export async function registerAndSaveUser(username: string, email: string, password: string) {
  // 1. Primero registra al usuario en Firebase Authentication.
  //    Esto devuelve un objeto `User` con información como uid, email, etc.
  const user = await registerUser(email, password);

  // 2. Luego envías una petición POST a tu API interna (/api/profile)
  //    para guardar en tu base de datos el username y el email
  //    asociados al uid recién creado en Firebase.
  //
  //    Esta API route debe validar que el uid provenga de un token real
  //    o al menos estar protegida por tu middleware.
  await apiFetch("/api/profile", {
    method: "POST",
    body: JSON.stringify({
      uid: user.uid,
      email,
      username
    })
  });

  if (user) {
    await sendEmailVerification(user);
  }

  // 3. Devuelves el usuario final, útil para redirecciones o estados.
  return user;
}

import { registerUser } from "@/lib/authService";
import { apiFetch } from "@/lib/apiClient";

export async function registerAndSaveUser(username: string, email: string, password: string) {
  const user = await registerUser(email, password);

  await apiFetch("/api/profile", {
    method: "POST",
    body: JSON.stringify({
      uid: user.uid,
      email,
      username
    })
  });

  return user;
}

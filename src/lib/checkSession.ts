import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function requireNoAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return false;

  if (!adminAuth) return false;
  try {
    await adminAuth.verifyIdToken(token);
    return true; // usuario está logueado
  } catch {
    return false;
  }
}

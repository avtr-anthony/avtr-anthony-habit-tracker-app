import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

export async function requireNoAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return false;

  if (!adminAuth) return false;
  try {
    await adminAuth.verifySessionCookie(token, true);
    return true; // usuario está logueado
  } catch {
    return false;
  }
}

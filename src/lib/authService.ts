import { auth } from "./firebase";
import { SESSION_COOKIE_NAME } from "./constants";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";

// Recibe email y contraseña.
// Crea una nueva cuenta en Firebase Auth.
// Retorna únicamente la propiedad `user` del objeto UserCredential.
export async function registerUser(email: string, password: string): Promise<User> {
  if (!auth) throw new Error("Firebase Auth is not initialized");
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
}

function buildCookieAttributes() {
  const attributes = ["path=/", "SameSite=Lax"];
  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    attributes.push("Secure");
  }
  return attributes.join("; ");
}

// Elimina manualmente la cookie de sesión utilizada por Firebase Hosting.
export function destroyToken() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE_NAME}=; ${buildCookieAttributes()}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

// Inicia sesión con email y contraseña.
// - Primero cierra cualquier sesión previa (signOut).
// - Elimina el token previo por seguridad.
// - Autentica al usuario con Firebase.
// - Obtiene el idToken del usuario autenticado.
// - Guarda dicho token en una cookie para que el backend pueda validar.
// - Retorna el usuario autenticado.
export async function loginUser(email: string, password: string) {
  if (!auth) throw new Error("Firebase Auth is not initialized");
  await signOut(auth); // Asegura que no exista sesión previa
  destroyToken(); // Limpia token previo

  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  if (!userCredential.user.emailVerified) {
    await sendEmailVerification(userCredential.user);
    await signOut(auth);
    destroyToken();
    throw new Error("email-not-verified");
  }

  // Solicita a Firebase el idToken del usuario autenticado
  const idToken = await userCredential.user.getIdToken();

  // Guarda el token en la cookie `__session` (única que reenvía Firebase Hosting)
  document.cookie = `${SESSION_COOKIE_NAME}=${idToken}; ${buildCookieAttributes()}`;

  return userCredential.user;
}

// Cierra la sesión del usuario.
// Firebase elimina la sesión local automáticamente.
// (No se implementa eliminación de cookies aquí, pero podría hacerse si se requiere)
export async function logoutUser(): Promise<void> {
  if (auth) {
    await signOut(auth);
  }
}

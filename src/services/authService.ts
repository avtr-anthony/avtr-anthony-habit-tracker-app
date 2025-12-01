import { auth } from "../lib/firebase";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";

const SESSION_ENDPOINT = "/api/auth/session";

// Recibe email y contraseña.
// Crea una nueva cuenta en Firebase Auth.
// Retorna únicamente la propiedad `user` del objeto UserCredential.
export async function registerUser(email: string, password: string): Promise<User> {
  if (!auth) throw new Error("Firebase Auth is not initialized");
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
}

async function setSessionCookie(idToken: string) {
  if (typeof fetch === "undefined") return;
  const response = await fetch(SESSION_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken })
  });

  if (!response.ok) {
    throw new Error("session-cookie");
  }
}

// Solicita al backend que elimine la cookie de sesión (__session).
export async function destroyToken() {
  if (typeof fetch === "undefined") return;
  try {
    await fetch(SESSION_ENDPOINT, { method: "DELETE" });
  } catch (error) {
    console.error("Failed to destroy session cookie", error);
  }
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
  await destroyToken(); // Limpia token previo

  const userCredential = await signInWithEmailAndPassword(auth, email, password);

  if (!userCredential.user.emailVerified) {
    await sendEmailVerification(userCredential.user);
    await signOut(auth);
    await destroyToken();
    throw new Error("email-not-verified");
  }

  // Solicita a Firebase el idToken del usuario autenticado
  const idToken = await userCredential.user.getIdToken();

  // Solicita al backend crear la cookie de sesión (__session) usando Firebase Admin
  await setSessionCookie(idToken);

  return userCredential.user;
}

// Cierra la sesión del usuario.
// Firebase elimina la sesión local automáticamente.
export async function logoutUser(): Promise<void> {
  await destroyToken();
  if (auth) {
    await signOut(auth);
  }
}

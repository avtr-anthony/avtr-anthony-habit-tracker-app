import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
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

// Elimina manualmente la cookie `token`
// Esto fuerza al cliente a borrar el token de sesión.
export function destroyToken() {
  document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
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

  // Solicita a Firebase el idToken del usuario autenticado
  const idToken = await userCredential.user.getIdToken();

  // Guarda el token en una cookie para autenticar peticiones posteriores
  document.cookie = `token=${idToken}; path=/;`;

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

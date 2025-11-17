import { auth } from "./firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";

// Recibe parameters
// crea una cuenta en firebase
// devuelve objeto UserCredential (propiedad = user)
export async function registerUser(email: string, password: string): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
}

export function destroyToken() {
  document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
// Se revisa si existe una cuenta
// Se devuelve nuevamente UserCredential
// devuelve el user autenticado
export async function loginUser(email: string, password: string) {
  await signOut(auth);
  destroyToken();
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const idToken = await userCredential.user.getIdToken();

  // Guardar el token en una cookie
  document.cookie = `token=${idToken}; path=/;`;

  return userCredential.user;
}

// Desconexión
// firebase elimina sesión local
// TODO: NO SE HA IMPLEMENTADO
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

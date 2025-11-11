import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from "firebase/auth";

// Recibe parametros
// crea una cuenta en firebase
// devuelve objeto UserCredential (propiedad = user)
export async function registerUser(email: string, password: string): Promise<User> {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
}

// Se revisa si existe una cuenta
// Se devuelve nuevamente UserCredential
// devuelve el user autenticado
export async function loginUser(email: string, password: string): Promise<User> {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

// Desconexion
// firebase elimina sesion local
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

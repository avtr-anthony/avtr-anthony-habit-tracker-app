import admin from "firebase-admin";
import type { auth } from "firebase-admin";

let adminAuth: auth.Auth | null = null;

// Variables reales que sí existen en tu .env
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// Verificar credenciales reales
const hasCredentials = projectId && clientEmail && privateKey;

if (hasCredentials) {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey
        })
      });
      adminAuth = admin.auth();
      console.log("Firebase Admin inicializado correctamente.");
    } catch (error) {
      console.error("Error al inicializar Firebase Admin:", error);
    }
  } else {
    adminAuth = admin.auth();
  }
} else {
  console.warn("Firebase Admin desactivado: faltan credenciales del .env");
}

export { adminAuth };

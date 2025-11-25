import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { Auth } from "firebase-admin/auth";

let adminAuth: Auth | null = null;

// Intenta usar credenciales explícitas (desarrollo/local)
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

try {
  if (!getApps().length) {
    if (projectId && clientEmail && privateKey) {
      // Entorno local / manual: usa la service account del .env
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey
        })
      });
    } else {
      // Entorno de Firebase Functions: usa credenciales por defecto del runtime
      initializeApp();
    }
  }

  adminAuth = getAuth();
  // eslint-disable-next-line no-console
  console.log("Firebase Admin inicializado correctamente.");
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("Error al inicializar Firebase Admin:", error);
  adminAuth = null;
}

export { adminAuth };

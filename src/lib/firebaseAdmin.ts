<<<<<<< HEAD
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { Auth } from "firebase-admin/auth";

let adminAuth: Auth | null = null;

// Intenta usar credenciales explícitas (desarrollo/local)
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.CLIENT_EMAIL_FIREBASE;
const privateKey = process.env.PRIVATE_KEY_FIREBASE?.replace(/\\n/g, "\n");

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
      // Entorno de Generales: usa credenciales por defecto del runtime
      initializeApp();
    }
  }

  adminAuth = getAuth();
} catch (error) {
  console.error("Error al inicializar Firebase Admin:", error);
  adminAuth = null;
}

export { adminAuth };
=======
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { Auth } from "firebase-admin/auth";

let adminAuth: Auth | null = null;

// Intenta usar credenciales explícitas (desarrollo/local)
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.CLIENT_EMAIL_FIREBASE;
const privateKey = process.env.PRIVATE_KEY_FIREBASE?.replace(/\\n/g, "\n");

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
      // Entorno de Generales: usa credenciales por defecto del runtime
      initializeApp();
    }
  }

  adminAuth = getAuth();
} catch (error) {
  console.error("Error al inicializar Firebase Admin:", error);
  adminAuth = null;
}

export { adminAuth };
>>>>>>> bc848c29868ce78d3441f52ee2400c004de2e729

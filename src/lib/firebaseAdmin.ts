import admin from "firebase-admin";

// Verifica si ya hay una app de Firebase Admin inicializada.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.error("Error al inicializar Firebase Admin:", error);
  }
}

// Exporta la instancia de autenticación del SDK Admin
export const adminAuth = admin.auth();


export { admin };

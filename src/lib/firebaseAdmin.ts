import admin from "firebase-admin";

// Verifica si Firebase Admin ya fue inicializado.
// `admin.apps.length === 0` significa que no existe ninguna instancia activa,
// por lo que se debe inicializar una nueva. Esto evita errores en entornos
// como Next.js donde el código se ejecuta más de una vez.
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      // Se usa una credencial tipo certificado en vez de application default.
      // Los valores vienen desde variables de entorno de tu proyecto.
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // La privateKey puede venir con saltos de línea escapados,
        // y Firebase necesita los saltos reales, por eso se reemplazan.
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")
      })
    });
  } catch (error) {
    // Si la inicialización falla (clave mal formateada, env inválido, etc.),
    // se muestra el error sin romper la app.
    console.error("Error al inicializar Firebase Admin:", error);
  }
}

// Exporta la instancia de autenticación del SDK Admin,
// para usar métodos como verifyIdToken o manejar usuarios desde el servidor.
export const adminAuth = admin.auth();

// S

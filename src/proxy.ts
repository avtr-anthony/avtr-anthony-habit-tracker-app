import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

// Middleware principal encargado de manejar:
// - Protección de rutas
// - Verificación de tokens Firebase
// - Redirecciones automáticas según autenticación
export async function proxy(req: NextRequest) {
  // Se clona la URL para poder modificarla (ej: redirecciones)
  const url = req.nextUrl.clone();

  // Se obtiene el token JWT almacenado en cookies (el Firebase ID Token)
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

  // Rutas públicas de autenticación
  const isAuthRoute = url.pathname === "/login" || url.pathname === "/register";

  // Rutas protegidas que requieren token
  const isProtectedRoute = url.pathname.startsWith("/habitos");

  // Si intenta acceder a una ruta protegida sin token → redirige a login
  if (isProtectedRoute && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Si existe token, se intenta verificar con Firebase Admin
  if (token) {
    try {
      if (!adminAuth) {
        throw new Error("Firebase Admin Auth is not initialized");
      }
      // Se decodifica el token y se verifica que sea válido
      const decoded = await adminAuth.verifyIdToken(token);

      // Si todo ok, se adjunta el UID en los headers para acceso interno
      req.headers.set("x-user-uid", decoded.uid);
    } catch (err) {
      // Si el token es inválido/expirado → se elimina cookie y se redirige a login
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete(SESSION_COOKIE_NAME);
      return res;
    }
  }

  // Si el usuario autenticado intenta entrar a login/register → se redirige a /habitos
  if (isAuthRoute && token) {
    url.pathname = "/habitos";
    return NextResponse.redirect(url);
  }

  // Si el usuario autenticado entra a la raíz "/" → se envía a /habitos
  if (url.pathname === "/" && token) {
    url.pathname = "/habitos";
    return NextResponse.redirect(url);
  }

  // Si no aplica ninguna regla, continúa el flujo normal de la petición
  return NextResponse.next();
}

// Configuración de las rutas que activa este middleware
export const config = {
  matcher: ["/", "/habitos/:path*", "/login", "/register"]
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Verifica si el usuario tiene sesión antes de entrar a /habitos
export function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Protege las rutas que comienzan con /habitos
  if (url.pathname.startsWith("/habitos")) {
    const token = req.cookies.get("token")?.value;

    // Si no hay token, redirige al login
    if (!token) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // Si tiene token o no es una ruta protegida continúa
  return NextResponse.next();
}

// Aplica este proxy a todas las rutas dentro de /habitos
export const config = {
  matcher: ["/habitos/:path*"],
};

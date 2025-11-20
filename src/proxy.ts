import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token")?.value;

  const isAuthRoute = url.pathname === "/login" || url.pathname === "/register";
  const isProtectedRoute = url.pathname.startsWith("/habitos");

  if (isProtectedRoute && !token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (token) {
    try {
      const decoded = await adminAuth.verifyIdToken(token);
      req.headers.set("x-user-uid", decoded.uid);
    } catch (err) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("token");
      return res;
    }
  }

  if (isAuthRoute && token) {
    url.pathname = "/habitos";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/" && token) {
    url.pathname = "/habitos";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/habitos/:path*", "/login", "/register"]
};

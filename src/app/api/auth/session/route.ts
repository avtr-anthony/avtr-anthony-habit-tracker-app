import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { SESSION_COOKIE_MAX_AGE_MS, SESSION_COOKIE_NAME } from "@/lib/constants";

const IS_PROD = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  try {
    if (!adminAuth) {
      return NextResponse.json(
        { error: "Servicio de autenticación no disponible" },
        { status: 500 }
      );
    }

    const { idToken } = (await req.json()) as { idToken?: string };
    if (!idToken) {
      return NextResponse.json({ error: "idToken requerido" }, { status: 400 });
    }

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: SESSION_COOKIE_MAX_AGE_MS
    });

    const response = NextResponse.json({ status: "ok" });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionCookie,
      maxAge: Math.floor(SESSION_COOKIE_MAX_AGE_MS / 1000),
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      path: "/"
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ status: "ok" });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    maxAge: 0,
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/"
  });
  return response;
}

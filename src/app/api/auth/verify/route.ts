export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

//recibe un token desde el cliente y lo valida con Firebase Admin
export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // Verifica el token con Firebase Admin
    const decoded = await adminAuth.verifyIdToken(token);

    // Respuesta exitosa con datos del usuario
    return NextResponse.json({
      valid: true,
      uid: decoded.uid,
      email: decoded.email,
    });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}

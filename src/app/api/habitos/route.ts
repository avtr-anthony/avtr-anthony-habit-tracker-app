import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return Response.json({ error: "No autorizado" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const body = await req.json();
    const { descripcion, label, fecha } = body;

    const habito = await prisma.habito.create({
      data: {
        user_id: userId,
        descripcion,
        label,
        fecha: new Date(fecha),
        completado: false
      }
    });

    return Response.json({ habito }, { status: 201 });
  } catch (err) {
    console.error("Error POST:", err);
    return Response.json({ error: "Error servidor" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No Autorizado" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const habito = await prisma.habito.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" }
    });

    return NextResponse.json({ habito }, { status: 200 });
  } catch (err) {
    console.error("Error GET:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

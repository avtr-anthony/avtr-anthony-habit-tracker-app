import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const body = await req.json();
    const { descripcion, label, fecha } = body;

    const userExists = await prisma.user.findUnique({
      where: { uid: userId }
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "El usuario no está registrado en la BD" },
        { status: 400 }
      );
    }

    const habito = await prisma.habito.create({
      data: {
        user_id: userId,
        descripcion,
        label,
        fecha: new Date(fecha),
        completado: false
      }
    });

    const habitoResponse = {
      ...habito,
      id_habito: Number(habito.id_habito)
    };

    return NextResponse.json({ habito: habitoResponse }, { status: 201 });
  } catch (err) {
    console.error("Error POST:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const habitos = await prisma.habito.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" }
    });

    const habitosResponse = habitos.map((h) => ({
      ...h,
      id_habito: Number(h.id_habito)
    }));

    return NextResponse.json({ habitos: habitosResponse }, { status: 200 });
  } catch (err) {
    console.error("Error GET:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import prisma from "@/lib/prisma";

interface UpdateHabitoBody {
  descripcion?: string;
  label?: string;
  fecha?: string;
  completado?: boolean;
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const habitId = Number(id);
    if (isNaN(habitId)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const body = await req.json();
    const allowedUpdates: UpdateHabitoBody & { completado?: boolean } = {};

    if (body.descripcion !== undefined) allowedUpdates.descripcion = body.descripcion;
    if (body.label !== undefined) allowedUpdates.label = body.label;
    if (body.fecha !== undefined) allowedUpdates.fecha = new Date(body.fecha).toISOString();
    if (body.completado !== undefined) allowedUpdates.completado = body.completado;

    const updated = await prisma.habito.updateMany({
      where: { id_habito: habitId, user_id: userId },
      data: allowedUpdates
    });

    if (updated.count === 0)
      return NextResponse.json({ error: "No encontrado o no autorizado" }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error PUT:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const habitId = Number(id);
    if (isNaN(habitId)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const deleted = await prisma.habito.deleteMany({
      where: { id_habito: habitId, user_id: userId }
    });

    if (deleted.count === 0)
      return NextResponse.json({ error: "No encontrado o no autorizado" }, { status: 404 });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error DELETE:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

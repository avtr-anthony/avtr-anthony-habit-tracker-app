import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { prisma } from "@/lib/prisma";

interface UpdateHabitoBody {
  descripcion?: string;
  label?: string;
  fecha?: string;
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const deleted = await prisma.habito.deleteMany({
      where: {
        id_habito: Number(id),
        user_id: userId
      }
    });

    if (deleted.count === 0) {
      return NextResponse.json({ error: "No encontra o autorizado" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = await context.params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const data = await req.json();
    const update = await prisma.habito.updateMany({
      where: {
        id_habito: Number(id),
        user_id: userId
      },
      data
    });

    if (update.count === 0) {
      return NextResponse.json({ error: "No encontrado o no autorizado" }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Update:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

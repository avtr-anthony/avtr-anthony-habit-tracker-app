import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { supabase } from "@/lib/supabase";

interface UpdateHabitoBody {
  descripcion?: string;
  label?: string;
  fecha?: string;
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const { error } = await supabase
      .from("habitos")
      .delete()
      .eq("id_habito", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error DELETE:", error);
      return NextResponse.json({ error: "No se pudo borrar el hábito" }, { status: 500 });
    }

    return NextResponse.json({ message: "Hábito eliminado" });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const body: UpdateHabitoBody = await req.json();

    const { data, error } = await supabase
      .from("habitos")
      .update(body)
      .eq("id_habito", id)
      .eq("user_id", userId)
      .select("*")
      .single();

    if (error) {
      console.error("Error UPDATE:", error);
      return NextResponse.json({ error: "No se pudo actualizar el hábito" }, { status: 500 });
    }

    return NextResponse.json({ habito: data });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

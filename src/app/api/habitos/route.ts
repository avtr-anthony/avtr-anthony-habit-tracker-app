import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return Response.json({ error: "No autorizado" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const body = await req.json();
    const { descripcion, label, fecha } = body;

    const { data, error } = await supabaseAdmin
      .from("habitos")
      .insert({
        user_id: userId,
        descripcion,
        label,
        fecha,
        completado: false
      })
      .select("*")
      .single();

    if (error) {
      console.error("Error POST:", error);
      return Response.json({ error: "No se pudo crear el hábito" }, { status: 500 });
    }

    return Response.json({ habito: data }, { status: 201 });
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

    // Usar supabaseAdmin que bypassea RLS ya que validamos autenticación en el servidor
    const { data, error } = await supabaseAdmin
      .from("habitos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error GET:", error);
      return NextResponse.json({ error: "No se pudo obtener los habitos" }, { status: 500 });
    }

    return NextResponse.json({ habitos: data }, { status: 200 });
  } catch (err) {
    console.error("Error GET:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

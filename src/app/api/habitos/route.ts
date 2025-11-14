import { adminAuth } from "@/lib/firebaseAdmin";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Obteniendo el token
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          error: "No Autorizado"
        },
        { status: 401 }
      );
    }

    // Decode token
    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    // Obtener los datos
    const body = await req.json();
    const { descripcion, label, fecha } = body;

    // Valida campos en caso de falten
    if (!descripcion || !fecha || !label) {
      return NextResponse.json({ error: "Faltan Campos" }, { status: 400 });
    }

    const { data, error } = await supabase
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
      console.error("Error servidor", error);
      return NextResponse.json({ error: "No se pudo crear el habito" }, { status: 500 });
    }

    return NextResponse.json({ habito: data }, { status: 201 });
  } catch (err) {
    console.error("Error Post", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    const { data, error } = await supabase
      .from("habitos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error al obtener habitos", error);
      return NextResponse.json({ error: "No se pudo obtener los habitos" }, { status: 500 });
    }

    return NextResponse.json({ habitos: data }, { status: 200 });
  } catch (err) {
    console.error("Error GET", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { uid, email, username } = await req.json();

    const { error } = await supabaseAdmin.from("users").insert([{ uid, email, username }]);

    if (error) throw error;
    return NextResponse.json({ message: "Perfil guardado" }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Error Desconocido" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const uid = url.searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "UID REQUERIDA" });
    }

    const { data, error } = await supabaseAdmin
      .from("users")
      .select("username")
      .eq("uid", uid)
      .single();

    if (error) throw error;

    return NextResponse.json({ username: data.username }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

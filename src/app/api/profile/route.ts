import {supabase} from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try {
        const {uid, email, username} = await req.json();

        const {error} = await supabase.from("users").insert([
            {uid,email,username},
        ]);

        if (error) throw error;
        return NextResponse.json({message: "Perfil guardado"}, {status: 200})
    } catch (err: unknown){
        if (err instanceof Error){
            return NextResponse.json({error: err.message}, {status: 500})
        }
        return NextResponse.json({error: "Error Desconocido"},{status: 500 })
    }
}
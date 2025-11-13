import { adminAuth } from "@/lib/firebaseAdmin";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Obteniendo el token
        const token = req.coockies.get("token")?.value

        if (!token) {
            return NextResponse.json({
                error: "No Autorizado"
            }, {status: 401})
        }

        // Decode token 
        const decoded = await adminAuth.verifyIdToken(token)
        const userId = decoded.uid;

        // Obtener los datos
        const body = await req.json()
        const {descripcion, nota, fecha, hora} = body

        // Valida campos en caso de falten
        if (!descripcion || !fecha || !hora) {
            return NextResponse.json(
                {error: "Faltan Campos"},
                {status: 400}
            )
        } 

        const {data, error } = await supabase
        .from("habitos")
        .insert({
            user_id: userId,
            descripcion,
            nota,
            fecha,
            hora,
            completado: false
        })
        .select("*")
        .single()

        if (error) {
            console.error ("Error servidor", error)
            return NextResponse.json(
                {error: "No se pudo crear el habito"},
                {status: 500}
            )
        }
    
        return NextResponse.json({habito:data}, {status: 201 })
    } catch (err) {
        console.error ("Error Post", err)
        return NextResponse.json(
            {error: "Error servidor"},
            {status: 500}
        )
    }
}
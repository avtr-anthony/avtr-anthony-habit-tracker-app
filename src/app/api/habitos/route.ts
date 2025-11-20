import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import prisma from "@/lib/prisma";

// Función que maneja la creación de un nuevo hábito (HTTP POST)
export async function POST(req: NextRequest) {
  try {
    // Obtener token de autenticación desde cookies
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // Decodificar token para obtener UID del usuario
    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    // Obtener los datos enviados en el body de la petición
    const body = await req.json();
    const { descripcion, label, fecha } = body;

    // Verificar que el usuario exista en la base de datos
    const userExists = await prisma.user.findUnique({
      where: { uid: userId }
    });

    if (!userExists) {
      return NextResponse.json(
        { error: "El usuario no está registrado en la BD" },
        { status: 400 }
      );
    }

    // Crear un nuevo hábito en la base de datos asociado al usuario
    const habito = await prisma.habito.create({
      data: {
        user_id: userId,
        descripcion,
        label,
        fecha: new Date(fecha),
        completado: false
      }
    });

    // Preparar la respuesta, asegurando que el id sea número
    const habitoResponse = {
      ...habito,
      id_habito: Number(habito.id_habito)
    };

    // Retornar el hábito creado con código 201 (creado)
    return NextResponse.json({ habito: habitoResponse }, { status: 201 });
  } catch (err) {
    console.error("Error POST:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

// Función que obtiene todos los hábitos del usuario (HTTP GET)
export async function GET(req: NextRequest) {
  try {
    // Verificar token de autenticación
    const token = req.cookies.get("token")?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // Decodificar token para obtener UID del usuario
    const decoded = await adminAuth.verifyIdToken(token);
    const userId = decoded.uid;

    // Obtener todos los hábitos del usuario, ordenados por fecha de creación descendente
    const habitos = await prisma.habito.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" }
    });

    // Preparar la respuesta, asegurando que los IDs sean números
    const habitosResponse = habitos.map((h) => ({
      ...h,
      id_habito: Number(h.id_habito)
    }));

    // Retornar lista de hábitos con código 200
    return NextResponse.json({ habitos: habitosResponse }, { status: 200 });
  } catch (err) {
    console.error("Error GET:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

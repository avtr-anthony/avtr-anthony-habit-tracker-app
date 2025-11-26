import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import prisma from "@/lib/prisma";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

// Función que maneja la creación de un nuevo hábito (HTTP POST)
export async function POST(req: NextRequest) {
  try {
    // Obtener token de autenticación desde cookies
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // Verificar que el servicio de autenticación esté disponible
    if (!adminAuth) {
      return NextResponse.json(
        { error: "Servicio de autenticación no disponible" },
        { status: 500 }
      );
    }

    // Decodificar token para obtener UID del usuario
    const decoded = await adminAuth.verifySessionCookie(token, true);
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
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // Decodificar token para obtener UID del usuario
    if (!adminAuth) {
      return NextResponse.json(
        { error: "Servicio de autenticación no disponible" },
        { status: 500 }
      );
    }
    const decoded = await adminAuth.verifySessionCookie(token, true);
    const userId = decoded.uid;

    // Validar si se solicitó una fecha específica
    const dateParam = req.nextUrl.searchParams.get("date");
    let fechaFilter:
      | {
          gte: Date;
          lte: Date;
        }
      | undefined;

    if (dateParam) {
      const parsedDate = new Date(dateParam);

      if (Number.isNaN(parsedDate.getTime())) {
        return NextResponse.json({ error: "Fecha inválida" }, { status: 400 });
      }

      const startOfDay = new Date(parsedDate);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(parsedDate);
      endOfDay.setUTCHours(23, 59, 59, 999);

      fechaFilter = { gte: startOfDay, lte: endOfDay };
    }

    // Obtener todos los hábitos del usuario, opcionalmente filtrados por fecha
    const habitos = await prisma.habito.findMany({
      where: {
        user_id: userId,
        ...(fechaFilter ? { fecha: fechaFilter } : {})
      },
      orderBy: [{ fecha: "desc" }, { created_at: "desc" }]
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

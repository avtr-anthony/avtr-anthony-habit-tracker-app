import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Interfaz para definir los datos que se reciben al crear o actualizar un perfil
interface ProfileBody {
  uid: string; // Identificador único del usuario
  email: string; // Correo electrónico del usuario
  username: string; // Nombre de usuario
}

// Interfaz para la respuesta de error
interface ErrorResponse {
  error: string;
}

// Interfaz para la respuesta exitosa al crear o actualizar un usuario
interface SuccessResponse {
  user: {
    uid: string;
    username: string;
    email: string;
    created_at: Date; // Fecha de creación del usuario
  };
}

// Función que maneja la creación o actualización de un usuario (HTTP POST)
export async function POST(
  req: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Obtener datos del body de la petición
    const body: ProfileBody = await req.json();
    const { uid, email, username } = body;

    // Validar que todos los campos estén presentes
    if (!uid || !email || !username) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    // Crear o actualizar el usuario en la base de datos
    const user = await prisma.user.upsert({
      where: { uid }, // Buscar por UID
      update: {}, // No se actualiza nada si ya existe
      create: {
        // Crear si no existe
        uid,
        email,
        username
      }
    });

    // Retornar usuario creado o existente
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    // Manejo de errores
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Interfaz para la respuesta del username
interface UsernameResponse {
  username: string;
}

// Función que obtiene el username de un usuario dado su UID (HTTP GET)
export async function GET(
  req: NextRequest
): Promise<NextResponse<UsernameResponse | ErrorResponse>> {
  try {
    // Extraer UID desde los parámetros de búsqueda de la URL
    const url = new URL(req.url);
    const uid = url.searchParams.get("uid");

    // Validar que se haya enviado el UID
    if (!uid) {
      return NextResponse.json({ error: "UID requerida" }, { status: 400 });
    }

    // Buscar el usuario en la base de datos, solo seleccionando el username
    const user = await prisma.user.findUnique({
      where: { uid },
      select: { username: true }
    });

    // Si no se encuentra el usuario, retornar error
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Retornar el username del usuario
    return NextResponse.json({ username: user.username }, { status: 200 });
  } catch (err) {
    // Manejo de errores
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

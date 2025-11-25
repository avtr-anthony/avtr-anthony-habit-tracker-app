import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { adminAuth } from "@/lib/firebaseAdmin";
import { SESSION_COOKIE_NAME } from "@/lib/constants";

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

// Función que maneja la creación o actualización de un usuario (HTTP POST).
// Se usa principalmente al registrar un usuario nuevo para guardar su perfil
// en la tabla `users` utilizando el uid de Firebase Auth.
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

// Función que obtiene el username de un usuario dado su UID (HTTP GET).
// Esta ruta la consume el hook useGetUsername en el cliente.
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

// Actualizar username y/o email del usuario autenticado (HTTP PUT).
// - Obtiene el uid a partir del token (cookie `__session`) usando Firebase Admin.
// - Permite cambiar username, email o ambos en la tabla `users`.
export async function PUT(
  req: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // 1. Leer token de la cookie enviada desde el cliente.
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    if (!adminAuth) {
      return NextResponse.json(
        { error: "Servicio de autenticación no disponible" },
        { status: 500 }
      );
    }

    // 2. Verificar token y obtener uid del usuario autenticado.
    const decoded = await adminAuth.verifySessionCookie(token, true);
    const uid = decoded.uid;

    // 3. Leer campos a actualizar desde el body (pueden venir uno o ambos).
    const body = (await req.json()) as Partial<ProfileBody>;
    const { username, email } = body;

    if (!username && !email) {
      return NextResponse.json({ error: "Nada para actualizar" }, { status: 400 });
    }

    const data: Partial<ProfileBody> = {};
    if (username) data.username = username;
    if (email) data.email = email;

    // 4. Actualizar en BD filtrando por uid (propiedad única del usuario).
    const user = await prisma.user.update({
      where: { uid },
      data
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: unknown) {
    // Error de clave única (por ejemplo, email duplicado en columna única).
    if (
      typeof error === "object" &&
      error &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "El correo ya está registrado en otra cuenta." },
        { status: 409 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

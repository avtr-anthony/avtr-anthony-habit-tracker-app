// Importaciones necesarias desde Next.js y librerías internas
import { NextRequest, NextResponse } from "next/server"; // NextRequest y NextResponse permiten manejar requests y responses en rutas API de Next.js
import { adminAuth } from "@/lib/firebaseAdmin"; // Importa la instancia de Firebase Admin para verificar tokens de autenticación
import prisma from "@/lib/prisma"; // Cliente de Prisma para interactuar con la base de datos
import { SESSION_COOKIE_NAME } from "@/lib/constants";

// Interfaz que define los posibles campos que se pueden actualizar en un hábito
interface UpdateHabitoBody {
  descripcion?: string; // Descripción del hábito
  label?: string; // Etiqueta o categoría del hábito
  fecha?: string; // Fecha asociada al hábito (formato string)
  completado?: boolean; // Estado de completado del hábito
}

// Función que maneja la actualización de un hábito (HTTP PUT)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Recibe los parámetros de la ruta (id del hábito)
) {
  try {
    // Obtener el ID del hábito desde los parámetros de la ruta
    const { id } = await params;
    const habitId = Number(id); // Convertir a número para usar en la base de datos

    // Validación de ID
    if (isNaN(habitId)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    // Verificar que exista un token de autenticación en las cookies
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // Verificar que adminAuth no sea null antes de usarlo
    if (!adminAuth) {
      return NextResponse.json({ error: "Error servidor autenticación" }, { status: 500 });
    }

    // Decodificar el token para obtener el UID del usuario
    const decoded = await adminAuth.verifySessionCookie(token, true);
    const userId = decoded.uid;

    // Obtener los datos enviados en el body de la petición
    const body = await req.json();


    // Objeto que contendrá los campos permitidos a actualizar
    const allowedUpdates: UpdateHabitoBody & { completado?: boolean } = {};

    // Validar y asignar cada campo solo si está definido
    if (body.descripcion !== undefined) allowedUpdates.descripcion = body.descripcion;
    if (body.label !== undefined) allowedUpdates.label = body.label;
    if (body.fecha !== undefined) allowedUpdates.fecha = new Date(body.fecha).toISOString();
    if (body.completado !== undefined) allowedUpdates.completado = body.completado;

    // Actualizar el hábito en la base de datos filtrando por ID y user_id
    const updated = await prisma.habito.updateMany({
      where: { id_habito: habitId, user_id: userId },
      data: allowedUpdates
    });

    // Si no se encontró ningún registro, retornar error 404
    if (updated.count === 0)
      return NextResponse.json({ error: "No encontrado o no autorizado" }, { status: 404 });

    // Volver a leer el hábito actualizado para retornarlo al cliente
    const habito = await prisma.habito.findFirst({
      where: { id_habito: habitId, user_id: userId }
    });

    if (!habito) {
      return NextResponse.json({ error: "No encontrado o no autorizado" }, { status: 404 });
    }

    const habitoResponse = {
      ...habito,
      id_habito: Number(habito.id_habito)
    };

    // Retornar respuesta exitosa con el hábito actualizado
    return NextResponse.json({ habito: habitoResponse }, { status: 200 });
  } catch (err) {
    // Manejo de errores generales
    console.error("Error PUT:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

// Función que maneja la eliminación de un hábito (HTTP DELETE)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Recibe los parámetros de la ruta (id del hábito)
) {
  try {
    // Obtener y validar el ID del hábito
    const { id } = await params;
    const habitId = Number(id);
    if (isNaN(habitId)) return NextResponse.json({ error: "ID inválido" }, { status: 400 });

    // Verificar token de autenticación
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // Decodificar token para obtener el UID del usuario
    if (!adminAuth) {
      return NextResponse.json({ error: "Servicio de autenticación no disponible" }, { status: 500 });
    }
    let decoded;
    try {
      decoded = await adminAuth.verifySessionCookie(token, true);
    } catch (error) {
      return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 });
    }
    const userId = decoded.uid;

    // Eliminar el hábito de la base de datos filtrando por ID y user_id
    const deleted = await prisma.habito.deleteMany({
      where: { id_habito: habitId, user_id: userId }
    });

    // Si no se encontró ningún registro, retornar error 404
    if (deleted.count === 0)
      return NextResponse.json({ error: "No encontrado o no autorizado" }, { status: 404 });

    // Retornar respuesta exitosa
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    // Manejo de errores generales
    console.error("Error DELETE:", err);
    return NextResponse.json({ error: "Error servidor" }, { status: 500 });
  }
}

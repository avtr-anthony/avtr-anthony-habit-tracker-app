import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ProfileBody {
  uid: string;
  email: string;
  username: string;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  user: {
    uid: string;
    username: string;
    email: string;
    created_at: Date;
  };
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    const body: ProfileBody = await req.json();

    const { uid, email, username } = body;

    if (!uid || !email || !username) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const user = await prisma.user.upsert({
      where: { uid },
      update: {},
      create: {
        uid,
        email,
        username
      }
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

interface UsernameResponse {
  username: string;
}

export async function GET(
  req: NextRequest
): Promise<NextResponse<UsernameResponse | ErrorResponse>> {
  try {
    const url = new URL(req.url);
    const uid = url.searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ error: "UID requerida" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { uid },
      select: { username: true }
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ username: user.username }, { status: 200 });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Error desconocido";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

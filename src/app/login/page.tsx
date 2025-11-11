"use client";
import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";
import { useRouter } from "next/navigation";
import { loginUser } from "@/lib/authService";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleLogin(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setError("");

    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));

    try {
      await loginUser(email, password);
      router.push("/habitos");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error al iniciar sesion", err.message);
      } else {
        setError("Error desconocido");
        console.error("Error al iniciar sesion", err);
      }
    }
  }

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Header />
      <Container>
        <section className="flex h-full w-full flex-col items-center justify-center gap-10 md:flex-row">
          <div className="flex max-w-lg flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-text mb-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Bienvenido de nuevo
            </h1>
            <p className="text-textSecondary text-base leading-relaxed sm:text-lg">
              Inicia sesión para continuar construyendo tus hábitos diarios.
            </p>
          </div>
          <div className="w-full max-w-md">
            <Card
              title="Iniciar Sesión"
              onSubmit={handleLogin}
              inputs={[
                {
                  label: "Correo",
                  type: "email",
                  placeholder: "Ingresa tu correo",
                  name: "email",
                },
                {
                  label: "Contraseña",
                  type: "password",
                  placeholder: "******",
                  name: "password",
                },
              ]}
              button={{
                label: "Ingresar",
                variant: "primary",
              }}
              footerText="¿No tienes cuenta?"
              footerLinkText="Regístrate aquí"
              footerHref="/register"
            >
              {error && <p className="!text-error text-center mt-4">{error}</p>}
            </Card>
          </div>
        </section>
      </Container>
    </div>
  );
}

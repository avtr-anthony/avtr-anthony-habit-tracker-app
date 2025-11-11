"use client";
import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/authService";
import { useState } from "react";

export default function Register() {
  // Manejo registro y errores
  const router = useRouter();
  const [error, setError] = useState("");

  // handle formu
  async function handleRegister(ev: React.FormEvent<HTMLFormElement>) {
    // Se evita el relooad y limpiamos errores previos
    ev.preventDefault();
    setError("");

    // Extraccion de valores
    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const confPassword = String(form.get("confPassword"));

    if (password !== confPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Post, Redirigimos y captamos errores
    try {
      const user = await registerUser(email, password);

      await fetch("api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          username: String(form.get("username")),
        }),
      });

      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error al registrar:", err.message);
      } else {
        setError("Error desconocido");
        console.error("Error al registrar (sin tipo):", err);
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
              Crea tu cuenta
            </h1>
            <p className="text-textSecondary text-base leading-relaxed sm:text-lg">
              Regístrate y comienza a construir los hábitos que transformarán tu
              día a día.
            </p>
          </div>
          <div className="w-full max-w-md">
            <Card
              title="Regístrate"
              onSubmit={handleRegister}
              inputs={[
                {
                  label: "Nombre Usuario",
                  type: "text",
                  placeholder: "Ingresa tu usuario",
                  name: "username",
                },
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
                {
                  label: "Repite Contraseña",
                  type: "password",
                  placeholder: "******",
                  name: "confPassword",
                },
              ]}
              button={{
                label: "Registrarse",
                variant: "primary",
              }}
              footerText="¿Ya tienes cuenta?"
              footerLinkText="Ingresa aquí"
              footerHref="/login"
            >
              {error && <p className="!text-error text-center mt-4">{error}</p>}
            </Card>
          </div>
        </section>
      </Container>
    </div>
  );
}

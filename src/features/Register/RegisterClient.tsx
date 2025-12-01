"use client";

import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";
import Loading from "@/features/ui/Loading";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function RegisterClient() {
  const { error, handleRegister, loading } = useRegister();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.emailVerified) router.replace("/habitos");
  }, [user, router]);

  if (loading || user?.emailVerified) return <Loading />;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Container>
        <section className="flex h-full w-full flex-col items-center justify-center gap-10 md:flex-row">
          <div className="flex max-w-lg flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-text mb-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Crea tu cuenta
            </h1>
            <p className="text-textSecondary text-base leading-relaxed sm:text-lg">
              Regístrate y comienza a construir los hábitos que transformarán tu día a día.
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
                  maxLength: 20,
                  pattern: "^[A-Za-z0-9_]+$"
                },
                {
                  label: "Correo",
                  type: "email",
                  placeholder: "Ingresa tu correo",
                  name: "email",
                  maxLength: 35
                },
                {
                  label: "Contraseña",
                  type: "password",
                  placeholder: "******",
                  name: "password",
                  maxLength: 12
                },
                {
                  label: "Repite Contraseña",
                  type: "password",
                  placeholder: "******",
                  name: "confPassword",
                  maxLength: 12
                }
              ]}
              button={{
                label: "Registrarse",
                variant: "primary"
              }}
              footerText="¿Ya tienes cuenta?"
              footerLinkText=" Ingresa aquí"
              footerHref="/login"
            >
              {error && <p className="text-error! mt-4 text-center">{error}</p>}
            </Card>
          </div>
        </section>
      </Container>
    </div>
  );
}

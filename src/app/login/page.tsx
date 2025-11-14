"use client";
import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";
import { useLogin } from "@/hooks/useLogin";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectLogin";
import Loading from "@/features/ui/Loading";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const { user, loading } = useAuth();
  const { error, handleLogin } = useLogin();
  useRedirectIfLoggedIn();

  if (loading || user) return <Loading />;

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
                  name: "email"
                },
                {
                  label: "Contraseña",
                  type: "password",
                  placeholder: "******",
                  name: "password"
                }
              ]}
              button={{
                label: "Ingresar",
                variant: "primary"
              }}
              footerText="¿No tienes cuenta?"
              footerLinkText=" Regístrate aquí"
              footerHref="/register"
            >
              {error && <p className="!text-error mt-4 text-center">{error}</p>}
            </Card>
          </div>
        </section>
      </Container>
    </div>
  );
}

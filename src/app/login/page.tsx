"use client";

import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";
import { useLogin } from "@/hooks/useLogin";
import Loading from "@/features/ui/Loading";

// Componente de página de Login
export default function Login() {
  // Hook personalizado para manejar login
  const { error, handleLogin, loading } = useLogin();

  // Mostrar pantalla de carga mientras se procesa el login
  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header de la página */}
      <Header />

      {/* Contenedor principal */}
      <Container>
        <section className="flex h-full w-full flex-col items-center justify-center gap-10 md:flex-row">
          {/* Sección de bienvenida y texto */}
          <div className="flex max-w-lg flex-col items-center text-center md:items-start md:text-left">
            <h1 className="text-surface mb-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Bienvenido de nuevo
            </h1>
            <p className="text-textSecondary text-base leading-relaxed sm:text-lg">
              Inicia sesión para continuar construyendo tus hábitos diarios.
            </p>
          </div>

          {/* Sección del formulario de login */}
          <div className="w-full max-w-md">
            <Card
              title="Iniciar Sesión"
              onSubmit={handleLogin} // Función que se ejecuta al enviar el formulario
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
              {/* Mostrar mensaje de error si existe */}
              {error && <p className="!text-error mt-4 text-center">{error}</p>}
            </Card>
          </div>
        </section>
      </Container>
    </div>
  );
}

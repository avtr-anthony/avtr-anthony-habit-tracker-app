import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";

export default function Login() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Container>
        <section className="flex flex-col md:flex-row items-center justify-center w-full min-h-[calc(100vh-80px)] px-4 sm:px-6 md:px-10 lg:px-20 gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text mb-4">
              Bienvenido de nuevo
            </h1>
            <p className="text-base sm:text-lg text-textSecondary leading-relaxed">
              Inicia sesión para continuar construyendo tus hábitos diarios.
            </p>
          </div>
          <div className="w-full max-w-md">
            <Card
              title="Iniciar Sesión"
              inputs={[
                {
                  label: "Correo",
                  type: "email",
                  placeholder: "Ingresa tu correo",
                },
                {
                  label: "Contraseña",
                  type: "password",
                  placeholder: "******",
                },
              ]}
              button={{
                label: "Ingresar",
                variant: "primary",
              }}
              footerText="¿No tienes cuenta?"
              footerLinkText="Regístrate aquí"
              footerHref="/register"
            />
          </div>
        </section>
      </Container>
    </div>
  );
}

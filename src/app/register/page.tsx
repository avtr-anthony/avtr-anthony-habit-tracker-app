import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <Container>
        <section className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-10">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text mb-4">
              Crea tu cuenta
            </h1>
            <p className="text-base sm:text-lg text-textSecondary leading-relaxed">
              Regístrate y comienza a construir los hábitos que transformarán tu
              día a día.
            </p>
          </div>
          <div className="w-full max-w-md">
            <Card
              title="Regístrate"
              inputs={[
                {
                  label: "Nombre Usuario",
                  type: "text",
                  placeholder: "Nombre de usuario",
                },
                {
                  label: "Correo",
                  type: "email",
                  placeholder: "Ingresa tu correo",
                },
                {
                  label: "Contraseña",
                  type: "password",
                  placeholder: "Contraseña",
                },
                {
                  label: "Repite Contraseña",
                  type: "password",
                  placeholder: "Repite tu contraseña",
                },
              ]}
              button={{
                label: "Registrarse",
                variant: "primary",
              }}
              footerText="¿Ya tienes cuenta?"
              footerLinkText="Ingresa aquí"
              footerHref="/login"
            />
          </div>
        </section>
      </Container>
    </div>
  );
}

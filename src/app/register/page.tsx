import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";

export default function Register() {
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
              Regístrate y comienza a construir los hábitos que transformarán tu día a día.
            </p>
          </div>
          <div className="w-full max-w-md">
            <Card
              title="Regístrate"
              inputs={[
                {
                  label: "Nombre Usuario",
                  type: "text",
                  placeholder: "Nombre de usuario"
                },
                {
                  label: "Correo",
                  type: "email",
                  placeholder: "Ingresa tu correo"
                },
                {
                  label: "Contraseña",
                  type: "password",
                  placeholder: "Contraseña"
                },
                {
                  label: "Repite Contraseña",
                  type: "password",
                  placeholder: "Repite tu contraseña"
                }
              ]}
              button={{
                label: "Registrarse",
                variant: "primary"
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

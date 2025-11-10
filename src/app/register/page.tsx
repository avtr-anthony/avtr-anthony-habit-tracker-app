import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";
export default function Login() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header />
      <Container>
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
              label: "Contraseña",
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
      </Container>
    </div>
  );
}

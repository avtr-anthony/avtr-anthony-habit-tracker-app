import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
import Container from "@/features/ui/Container";
export default function Login() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header />
      <Container>
        <Card
          title="Iniciar Sesión"
          inputs={[
            {
              label: "Correo",
              type: "email",
              placeholder: "Ingresa tu correo",
            },
            { label: "Contraseña", type: "password", placeholder: "******" },
          ]}
          button={{
            label: "Ingresar",
            variant: "primary",
          }}
          footerText="¿No tienes cuenta?"
          footerLinkText="Regístrate aquí"
          footerHref="/register"
        />
      </Container>
    </div>
  );
}

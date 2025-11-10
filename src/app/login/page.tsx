import Header from "@/features/ui/Header";
import Card from "@/features/ui/CardAuth";
export default function Login() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header />
      <div className="flex flex-1 flex-col justify-center items-center">
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
      </div>
    </div>
  );
}

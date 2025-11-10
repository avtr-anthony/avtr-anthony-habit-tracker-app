import Header from "@/features/ui/Header";
import Button from "@/features/ui/BodyButton";
import Container from "../ui/Container";

export default function Home() {
  return (
    <>
      <Header
        buttons={[
          { label: "Inicio Sesión", href: "/login", variant: "outline" },
          { label: "Registrarse", href: "/register", variant: "primary" },
        ]}
      />

      <Container>
        <div className="flex flex-1 flex-col justify-center items-center">
          <div className="max-w-3xl text-center flex-col gap-2 flex mb-10">
            <p className="italic text-xl">
              Construir hábitos saludables no se trata de cambiar de un día para
              otro, sino de avanzar paso a paso
            </p>
            <h1 className="text-6xl font-black uppercase">
              Sé la mejor versión de ti
            </h1>
          </div>
          <Button label="Comienza ahora" variant="primary" href="/register" />
        </div>
      </Container>
    </>
  );
}

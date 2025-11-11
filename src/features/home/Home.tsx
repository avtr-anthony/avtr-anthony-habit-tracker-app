import Header from "@/features/ui/Header";
import Button from "@/features/ui/BodyButton";
import Container from "../ui/Container";

export default function Home() {
  return (
    <>
      <Header
        buttons={[
          { label: "Inicio Sesión", href: "/login", variant: "outline" },
          { label: "Registrarse", href: "/register", variant: "primary" }
        ]}
      />
      <Container>
        <section className="flex h-full w-full flex-col items-center justify-center text-center">
          <div className="mb-10 flex max-w-3xl flex-col items-center gap-4 md:items-start">
            <p className="text-textSecondary text-base leading-relaxed italic sm:text-lg md:text-xl">
              Construir hábitos saludables no se trata de cambiar de un día para otro, sino de
              avanzar paso a paso.
            </p>
            <h1 className="text-text text-4xl leading-tight font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl">
              Sé la mejor versión de ti
            </h1>
          </div>
          <Button label="Comienza ahora" variant="primary" href="/register" />
        </section>
      </Container>
    </>
  );
}

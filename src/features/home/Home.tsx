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
        <section className="flex flex-col items-center justify-center w-full h-full text-center">
          <div className="max-w-3xl flex flex-col items-center md:items-start gap-4 mb-10">
            <p className="italic text-base sm:text-lg md:text-xl text-textSecondary leading-relaxed">
              Construir hábitos saludables no se trata de cambiar de un día para
              otro, sino de avanzar paso a paso.
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-text leading-tight">
              Sé la mejor versión de ti
            </h1>
          </div>
          <Button label="Comienza ahora" variant="primary" href="/register" />
        </section>
      </Container>
    </>
  );
}

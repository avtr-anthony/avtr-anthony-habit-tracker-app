import Header from "@/features/ui/Header";
import Button from "@/features/ui/BodyButton";
import Container from "../ui/Container";

// Componente de la página de inicio
export default function Home() {
  return (
    <>
      {/* Header con botones de navegación */}
      <Header
        buttons={[
          { label: "Login", href: "/login", variant: "outline" }, // Botón de login
          { label: "Registro", href: "/register", variant: "primary" } // Botón de registro
        ]}
        variant="hDefault"
      />

      {/* Contenedor principal */}
      <Container>
        <section className="flex h-full w-full flex-col items-center justify-center text-center">
          {/* Sección de texto motivacional */}
          <div className="mb-10 flex max-w-3xl flex-col items-center gap-4 md:items-start">
            <p className="text-textSecondary text-base leading-relaxed italic sm:text-lg md:text-xl">
              Construir hábitos saludables no se trata de cambiar de un día para otro, sino de
              avanzar paso a paso.
            </p>
            <h1 className="text-text text-4xl leading-tight font-black uppercase sm:text-5xl md:text-6xl lg:text-7xl">
              Sé la mejor versión de ti
            </h1>
          </div>

          {/* Botón de llamada a la acción */}
          <Button label="Comienza ahora" variant="primary" href="/register" />
        </section>
      </Container>
    </>
  );
}

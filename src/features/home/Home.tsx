import Header from "@/features/ui/Header";
import Button from "@/features/ui/BodyButton";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-0 ">
      <Header
        buttons={[
          { label: "Inicio Sesión", href: "/login", variant: "outline" },
          { label: "Registrarse", href: "/register", variant: "primary" },
        ]}
      ></Header>
      <div className="flex flex-1 flex-col justify-center items-center">
        <div className="max-w-3xl text-center flex-col gap-2 flex mb-10">
          <p className="italic text-xl">
            Construir hábitos saludables no se trata de cambiar de un día para
            otro, sino de avanzar paso a paso
          </p>
          <h1 className="text-6xl font-black uppercase">
            Se la mejor versión de ti
          </h1>
        </div>
        <Button label="Comienza ahora" variant="primary" />
      </div>
    </div>
  );
}

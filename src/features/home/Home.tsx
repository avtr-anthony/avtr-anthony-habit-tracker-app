"use client";
import Header from "@/features/ui/Header";
import Button from "@/features/ui/BodyButton";
import Container from "../ui/Container";
import { useRedirectIfLoggedIn } from "@/hooks/useRedirectLogin";
import Loading from "@/features/ui/Loading";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();
  useRedirectIfLoggedIn();
  if (loading || user) return <Loading />;

  return (
    <>
      <Header
        buttons={[
          { label: "Login", href: "/login", variant: "outline" },
          { label: "Registro", href: "/register", variant: "primary" }
        ]}
        variant="hDefault"
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

"use client";
import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import CardHabitos from "@/features/ui/CardHabitos";
import { useProtectedRoute } from "@/hooks/useProtectedRout";

export default function Habitos() {
  useProtectedRoute();

  return (
    <>
      <Header variant="hPanel" showUser />

      <Container variant="panel">
        <section className="flex h-full w-full bg-gray-50">
          <nav className="bg- h-full w-64 p-4 sm:px-6 md:px-10">hola</nav>
          <div className="flex flex-1 flex-col p-8">
            <CardHabitos label="Primer hábito" description="No te olvides de tomar agua hoy" />
          </div>
        </section>
      </Container>
    </>
  );
}

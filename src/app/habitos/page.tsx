"use client";
import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import CardHabitos from "@/features/ui/CardHabitos";

export default function Habitos() {
  return (
    <>
      <Header variant="hDefault" showUser  />

      <Container variant="panel">
        <section className="flex h-full w-full bg-gray-50">
          <nav className="bg-primary h-full w-64 p-4 sm:px-6 md:px-10">hola</nav>
          <div className="flex flex-1 flex-col p-8">
            <CardHabitos label="Primer hábito" description="No te olvides de tomar agua hoy" />
          </div>
        </section>
      </Container>
    </>
  );
}

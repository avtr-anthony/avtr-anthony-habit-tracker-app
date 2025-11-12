"use client";
import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import CardHabitos from "@/features/ui/CardHabitos";

export default function Habitos() {
  return (
    <>
      <Header
        variant="hDefault"
        showUser
        buttons={[
          { label: "Panel", href: "/habitos", variant: "primary" },
          { label: "Historial", href: "/habitos", variant: "primary" }
        ]}
      />

      <Container variant="panel">
        <section className="h-full w-full bg-black">
          <nav></nav>
        </section>

        <section className="flex h-full w-full p-8">
          <CardHabitos label="Primer hábito" description="No te olvides de tomar agua hoy" />
        </section>
      </Container>
    </>
  );
}

"use client";
import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import CardHabitos from "@/features/habitos/CardHabitos";
import ModalDialog from "@/features/ui/ModalDialog";
import FormHabito from "@/features/habitos/FormHabitos";
import { useProtectedRoute } from "@/hooks/useProtectedRout";
import { useCargaHabitos } from "@/hooks/habitos/useLoadHabitos";
import { useCreateHabito } from "@/hooks/habitos/useCreateHabitos";

export default function Habitos() {
  useProtectedRoute();
  useCreateHabito();

  const { habitos, openModal, setOpenModal, cargarHabitos } = useCargaHabitos();
  return (
    <>
      <Header variant="hPanel" showUser />
      <Container variant="panel">
        <section className="flex h-full w-full gap-6 bg-gray-50 p-6">
          <nav className="hidden w-64 p-4 md:block">hola</nav>

          <div className="flex flex-1 flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Tus Hábitos</h1>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-primary text-surface hover:bg-primaryHover h-10 w-10 rounded-full text-2xl font-bold shadow-md transition"
              >
                +
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {habitos.map((h) => (
                <CardHabitos key={h.id_habito} label={h.label} description={h.descripcion} />
              ))}

              {habitos.length === 0 && (
                <p className="text-textSecondary text-center">No tienes hábitos todavía.</p>
              )}
            </div>
          </div>
        </section>
      </Container>

      <ModalDialog open={openModal} onClose={() => setOpenModal(false)}>
        <FormHabito
          onSuccess={() => {
            setOpenModal(false);
            cargarHabitos();
          }}
        />
      </ModalDialog>
    </>
  );
}

"use client";
import Container from "@/features/ui/Container";
import Header from "@/features/ui/Header";
import CardHabitos from "@/features/habitos/CardHabitos";
import ModalDialog from "@/features/ui/ModalDialog";
import FormHabito from "@/features/habitos/FormHabitos";
import { useCargaHabitos } from "@/hooks/habitos/useLoadHabitos";
import { useCreateHabito } from "@/hooks/habitos/useCreateHabitos";
import { useLogout } from "@/hooks/useLogOut";
import Loading from "@/features/ui/Loading";

export default function Habitos() {
  const { logout, loading } = useLogout();
  useCreateHabito();
  const { habitos, openModal, setOpenModal, cargarHabitos } = useCargaHabitos();

  if (loading) return <Loading />;

  return (
    <>
      <Header variant="hPanel" showUser onClick={logout} />
      <Container variant="panel">
        <section className="flex h-full w-full gap-6 bg-gray-50 p-6">
          <nav className="hidden"></nav>

          <div className="flex flex-1 flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold">Tus Hábitos</h1>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-primary text-surface hover:bg-primaryHover h-10 w-10 rounded-full text-2xl font-bold shadow-md transition"
              >
                +
              </button>
            </div>

            <div className="grid h-full w-full grid-cols-[80%_20%] gap-4">
              <div className="/* ancho fijo por columna */ grid h-full flex-1 [grid-auto-columns:260px] grid-flow-col auto-rows-max gap-4 overflow-x-auto overflow-y-hidden">
                {habitos.map((h) => (
                  <CardHabitos key={h.id_habito} label={h.label} description={h.descripcion} />
                ))}

                {habitos.length === 0 && (
                  <p className="text-textSecondary text-center">No tienes hábitos todavía.</p>
                )}
              </div>
              <div>
                <p>hola</p>
              </div>
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

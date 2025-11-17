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
        <section className="h-full w-full flex-1 gap-6 overflow-hidden bg-gray-50 p-6">
          <div className="flex h-full w-full flex-col gap-6">
            <div className="flex w-full items-center justify-between">
              <h1 className="text-3xl font-bold">Tus Hábitos</h1>

              <button
                onClick={() => setOpenModal(true)}
                className="bg-primary text-surface hover:bg-primaryHover h-10 w-10 rounded-full text-2xl font-bold shadow-md transition"
              >
                +
              </button>
            </div>

            <div className="grid h-full w-full grid-cols-[80%_20%] gap-4 overflow-hidden">
              <div className="h-full overflow-x-scroll">
                <div className="overflow-x-scrol flex h-full min-w-max flex-col flex-wrap justify-center gap-4 pb-0">
                  {habitos.map((h) => (
                    <CardHabitos key={h.id_habito} label={h.label} description={h.descripcion} />
                  ))}

                  {habitos.length === 0 && (
                    <p className="text-textSecondary text-center">No tienes hábitos todavía.</p>
                  )}
                </div>
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

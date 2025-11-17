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
import { useDeleteHabito } from "@/hooks/habitos/useDeleteHabito";

export default function Habitos() {
  const { logout, loading } = useLogout();
  useCreateHabito();
  const { habitos, openModal, setOpenModal, cargarHabitos } = useCargaHabitos();
  const { handleDelete } = useDeleteHabito();
  if (loading) return <Loading />;

  return (
    <>
      <Header variant="hPanel" showUser onClick={logout} />
      <Container variant="panel">
        <section className="h-full w-full flex-1 gap-4 bg-linear-to-b from-white to-slate-100 p-4">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="bg-surface w-full rounded-xl border border-gray-100 p-4 shadow-xl">
                <h1 className="text-3xl font-bold">Tus Hábitos</h1>
              </div>
              <div className="bg-surface rounded-xl border border-gray-100 p-4 shadow-xl">
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-primary text-surface hover:bg-primaryHover h-10 w-10 rounded-full text-2xl font-bold shadow-md transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid h-full w-full grid-cols-[60%_40%] gap-4 overflow-hidden">
              <div className="h-full overflow-x-scroll rounded-lg border border-gray-300 p-4 shadow-xl">
                <div className="flex h-full min-w-max flex-col flex-wrap justify-evenly gap-4 pb-2">
                  {habitos.map((h) => (
                    <CardHabitos
                      key={h.id_habito}
                      id={h.id_habito}
                      label={h.label}
                      description={h.descripcion}
                      onDelete={async (id) => {
                        await handleDelete(id);
                        cargarHabitos();
                      }}
                    />
                  ))}

                  {habitos.length === 0 && (
                    <p className="text-textSecondary text-center">No tienes hábitos todavía.</p>
                  )}
                </div>
              </div>

              <div className="bg-surface h-full">
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

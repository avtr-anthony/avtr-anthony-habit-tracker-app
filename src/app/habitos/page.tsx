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
import { useState } from "react";
import { Habito } from "@/types/Habito";
import { useUpdateHabito } from "@/hooks/habitos/useUpdateHabito";

export default function Habitos() {
  const { logout, loading } = useLogout();
  useCreateHabito();
  const { habitos, openModal, setOpenModal, cargarHabitos } = useCargaHabitos();
  const { handleDelete } = useDeleteHabito();
  const { handleUpdate } = useUpdateHabito();
  const [habitoEditando, setHabitoEditando] = useState<Habito | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  if (loading) return <Loading />;

  return (
    <>
      <Header variant="hPanel" showUser onClick={logout} />
      <Container variant="panel">
        <section className="bg-op h-auto w-full flex-1 gap-4 bg-[url('/img/patron_v3.svg')] p-4 md:h-full">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="bg-text/30 w-full rounded-xl p-4 shadow-xl backdrop-blur-xl">
                <h1 className="!text-surface text-3xl font-bold">Tus Hábitos</h1>
              </div>
              <div className="bg-surface/30 rounded-xl p-4 shadow-xl backdrop-blur-xl">
                <button
                  onClick={() => {
                    setHabitoEditando(null);
                    setOpenModal(true);
                  }}
                  className="bg-primary text-surface hover:bg-primaryHover h-10 w-10 cursor-pointer rounded-full text-2xl font-bold shadow-md transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid h-full w-full grid-rows-[1fr_1fr] gap-4 md:grid-cols-[1fr_1fr] md:grid-rows-none md:overflow-hidden">
              <div className="scrollbar-transparent bg-text/30 w-full overflow-x-auto overflow-y-hidden rounded-lg p-4 shadow-xl backdrop-blur-xl md:pb-0">
                <div className="flex h-full max-h-[400px] flex-col flex-wrap gap-0 md:max-h-full md:min-w-max md:gap-4">
                  {habitos.map((h) => (
                    <CardHabitos
                      key={h.id_habito}
                      id={h.id_habito}
                      label={h.label}
                      description={h.descripcion}
                      onDelete={async (id) => {
                        const deleted = await handleDelete(id);
                        if (deleted) {
                          cargarHabitos();
                        }
                      }}
                      onEdit={(id) => {
                        const hSeleccionado = habitos.find((x) => x.id_habito === id);
                        if (hSeleccionado) {
                          setHabitoEditando(hSeleccionado);
                          setOpenModal(true);
                        }
                      }}
                      completed={h.completado}
                      onToggleCompleted={async (id, completed) => {
                        setUpdatingId(id);
                        try {
                          const updated = await handleUpdate(id, { completado: completed });
                          if (updated) cargarHabitos();
                        } catch (error) {
                          console.error("Error al actualizar hábito:", error);
                        } finally {
                          setUpdatingId(null);
                        }
                      }}
                      isUpdating={updatingId === h.id_habito}
                    />
                  ))}

                  {habitos.length === 0 && (
                    <p className="text-textSecondary text-center">No tienes hábitos todavía.</p>
                  )}
                </div>
              </div>

              <div className="row-start-1 flex rounded-lg bg-black/30 backdrop-blur-xl md:col-start-2">
                <p>hola</p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <ModalDialog
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setHabitoEditando(null);
        }}
      >
        <FormHabito
          habito={habitoEditando}
          onSuccess={() => {
            setOpenModal(false);
            setHabitoEditando(null);
            cargarHabitos();
          }}
        />
      </ModalDialog>
    </>
  );
}

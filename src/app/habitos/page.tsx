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
import CalendarioHabitos from "@/features/habitos/AsideSection";
import { useMemo, useState } from "react";
import { Habito } from "@/types/Habito";
import { useUpdateHabito } from "@/hooks/habitos/useUpdateHabito";
import { useRouter } from "next/navigation";

// Componente principal de la sección de hábitos
export default function Habitos() {
  const { logout, loading: authLoading } = useLogout();
  const router = useRouter();

  useCreateHabito();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const selectedDateISO = useMemo(() => selectedDate.toISOString().split("T")[0], [selectedDate]);

  const {
    habitos,
    openModal,
    setOpenModal,
    cargarHabitos,
    loading: habitosLoading,
    updateHabitoLocal
  } = useCargaHabitos(selectedDateISO);

  const { handleDelete } = useDeleteHabito();
  const { handleUpdate } = useUpdateHabito();

  const [habitoEditando, setHabitoEditando] = useState<Habito | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // eslint-disable-next-line
  const selectedDateLabel = useMemo(() => {
    const formatted = new Intl.DateTimeFormat("es-ES", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(selectedDate);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }, [selectedDate]);

  if (authLoading) return <Loading />;

  return (
    <>
      <Header
        variant="hPanel"
        showUser
        onClick={logout}
        onSettingsClick={() => router.push("/profile")}
      />

      <Container variant="panel">
        <section className="bg-op h-auto w-full flex-1 gap-4 md:h-full">
          <div className="flex h-full w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between gap-4">
              <div className="bg-surface/20 w-full rounded-xl p-4 shadow-xl/5 backdrop-blur-2xl">
                <h1 className="text-xl font-bold md:text-2xl">Tus Hábitos</h1>
              </div>

              <div className="bg-surface/20 rounded-xl p-4 shadow-xl/5 backdrop-blur-xl">
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

            <div className="grid h-full w-full grid-rows-[1fr] gap-4 md:flex md:grid-cols-[1fr_1fr] md:grid-rows-none md:overflow-hidden">
              <div className="scrollbar-transparent bg-surface/20 w-full overflow-x-auto overflow-y-hidden rounded-lg p-4 shadow-xl/5 backdrop-blur-xl md:pb-0">
                {habitosLoading ? (
                  <div className="flex h-full min-h-60 items-center justify-center">
                    <p className="text-textSecondary text-center">Cargando hábitos...</p>
                  </div>
                ) : (
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
                            cargarHabitos({ silent: true });
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
                            if (updated?.habito) {
                              updateHabitoLocal(id, { completado: completed });
                            }
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
                      <p className="text-textSecondary text-center">
                        No tienes hábitos para esta fecha.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="row-start-1 h-full w-full md:col-start-2">
                <CalendarioHabitos
                  habitosCount={habitos.length}
                  selectedDate={selectedDate}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                  }}
                />
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
          defaultDate={selectedDateISO}
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

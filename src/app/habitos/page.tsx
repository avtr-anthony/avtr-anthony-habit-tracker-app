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

// Componente principal de la sección de hábitos
export default function Habitos() {
  // Hook de logout y estado de carga
  const { logout, loading } = useLogout();

  // Hook para crear hábitos (efecto secundario, se inicializa al montar)
  useCreateHabito();

  // Hook para cargar hábitos y manejar el modal
  const { habitos, openModal, setOpenModal, cargarHabitos } = useCargaHabitos();

  // Hook para eliminar hábitos
  const { handleDelete } = useDeleteHabito();

  // Hook para actualizar hábitos
  const { handleUpdate } = useUpdateHabito();

  // Estado local para almacenar el hábito que se está editando
  const [habitoEditando, setHabitoEditando] = useState<Habito | null>(null);

  // Estado local para manejar el hábito que se está actualizando (para mostrar loading)
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Mostrar pantalla de carga si el logout o auth está en proceso
  if (loading) return <Loading />;

  return (
    <>
      {/* Header de la página con opción de logout */}
      <Header variant="hPanel" showUser onClick={logout} />

      {/* Contenedor principal */}
      <Container variant="panel">
        <section className="bg-op h-auto w-full flex-1 gap-4 p-4 md:h-full">
          <div className="flex h-full w-full flex-col gap-4">
            {/* Título y botón para crear nuevo hábito */}
            <div className="flex w-full items-center justify-between gap-4">
              <div className="bg-surface/20 w-full rounded-xl p-4 shadow-xl/5 backdrop-blur-2xl">
                <h1 className="text-3xl font-bold">Tus Hábitos</h1>
              </div>

              {/* Botón para abrir modal de creación de hábito */}
              <div className="bg-surface/20 rounded-xl p-4 shadow-xl/5 backdrop-blur-xl">
                <button
                  onClick={() => {
                    setHabitoEditando(null); // No se está editando, es un hábito nuevo
                    setOpenModal(true); // Abrir modal
                  }}
                  className="bg-primary text-surface hover:bg-primaryHover h-10 w-10 cursor-pointer rounded-full text-2xl font-bold shadow-md transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Grid principal para mostrar lista de hábitos y panel secundario */}
            <div className="grid h-full w-full grid-rows-[1fr_1fr] gap-4 md:grid-cols-[1fr_1fr] md:grid-rows-none md:overflow-hidden">
              {/* Sección de hábitos */}
              <div className="scrollbar-transparent bg-surface/20 w-full overflow-x-auto overflow-y-hidden rounded-lg p-4 shadow-xl/5 backdrop-blur-xl md:pb-0">
                <div className="flex h-full max-h-[400px] flex-col flex-wrap gap-0 md:max-h-full md:min-w-max md:gap-4">
                  {/* Renderizado de cada hábito como Card */}
                  {habitos.map((h) => (
                    <CardHabitos
                      key={h.id_habito}
                      id={h.id_habito}
                      label={h.label}
                      description={h.descripcion}
                      // Función para eliminar un hábito
                      onDelete={async (id) => {
                        const deleted = await handleDelete(id);
                        if (deleted) {
                          cargarHabitos(); // Recargar lista después de eliminar
                        }
                      }}
                      // Función para editar un hábito
                      onEdit={(id) => {
                        const hSeleccionado = habitos.find((x) => x.id_habito === id);
                        if (hSeleccionado) {
                          setHabitoEditando(hSeleccionado); // Establecer hábito a editar
                          setOpenModal(true); // Abrir modal de edición
                        }
                      }}
                      // Estado de completado del hábito
                      completed={h.completado}
                      // Toggle de completado
                      onToggleCompleted={async (id, completed) => {
                        setUpdatingId(id); // Marcar hábito como en actualización
                        try {
                          const updated = await handleUpdate(id, { completado: completed });
                          if (updated) cargarHabitos(); // Recargar hábitos si se actualizó
                        } catch (error) {
                          console.error("Error al actualizar hábito:", error);
                        } finally {
                          setUpdatingId(null); // Terminar estado de actualización
                        }
                      }}
                      // Indicar si el hábito está en proceso de actualización
                      isUpdating={updatingId === h.id_habito}
                    />
                  ))}

                  {/* Mensaje cuando no hay hábitos */}
                  {habitos.length === 0 && (
                    <p className="text-textSecondary text-center">No tienes hábitos todavía.</p>
                  )}
                </div>
              </div>

              {/* Panel secundario de contenido adicional */}
              <div className="bg-surface/20 row-start-1 flex rounded-lg shadow-xl/5 backdrop-blur-xl md:col-start-2">
                <p>hola</p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      {/* Modal de creación/edición de hábito */}
      <ModalDialog
        open={openModal}
        onClose={() => {
          setOpenModal(false); // Cerrar modal
          setHabitoEditando(null); // Limpiar hábito editando
        }}
      >
        <FormHabito
          habito={habitoEditando} // Pasar hábito a editar
          onSuccess={() => {
            setOpenModal(false); // Cerrar modal después de guardar
            setHabitoEditando(null); // Limpiar estado de edición
            cargarHabitos(); // Recargar hábitos
          }}
        />
      </ModalDialog>
    </>
  );
}

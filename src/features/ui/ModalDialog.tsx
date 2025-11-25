"use client";

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";

// Props del modal
interface ModalProps {
  open: boolean; // Estado de visibilidad del modal
  onClose: () => void; // Función para cerrar el modal
  children: React.ReactNode; // Contenido del modal
}

// Componente funcional ModalDialog
export default function ModalDialog({ open, onClose, children }: ModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      {/* Dialog principal */}
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Fondo del modal con transición de opacidad */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/5 backdrop-blur-lg transition-all duration-300 ease-in-out" />
        </TransitionChild>

        {/* Contenedor central del modal */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            {/* Panel del modal donde se renderiza el contenido */}
            <DialogPanel className="bg-surface/40 w-full max-w-md rounded-lg p-6 shadow-xl backdrop-blur-xl">
              {children}
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

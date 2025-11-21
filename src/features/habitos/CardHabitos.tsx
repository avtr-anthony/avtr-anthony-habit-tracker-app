"use client";

import clsx from "clsx";
import { Check, Ban, Trash, PencilLine } from "lucide-react";

// Props del componente CardHabitos
export interface HabitosCardProps {
  id: string; // ID único del hábito
  label?: string; // Etiqueta o nombre del hábito
  description?: string; // Descripción del hábito
  completed?: boolean; // Estado de completado
  onDelete?: (id: string) => void; // Función para eliminar hábito
  onEdit?: (id: string) => void; // Función para editar hábito
  onToggleCompleted?: (id: string, completed: boolean) => void; // Toggle completado
  isUpdating?: boolean; // Indica si se está actualizando
}

// Componente funcional CardHabitos
export default function CardHabitos({
  id,
  label,
  description,
  completed = false,
  onDelete,
  onEdit,
  onToggleCompleted,
  isUpdating = false
}: HabitosCardProps) {
  // Clases dinámicas según estado de completado
  const classes = clsx(
    "rounded-xl shadow-lg transition-all duration-300 ease-in-out w-full max-w-[440px] md:min-w-[420px] flex gap-3 backdrop-blur-xl h-[110px] md:h-[140px] w-[200px]  border",
    {
      "bg-success/10 border-success": completed,
      "bg-error/10 border-errorHover": !completed
    }
  );

  return (
    <div className="h-fit w-full pr-4 pb-4 md:w-fit md:pr-0 md:pb-0">
      <div className={classes}>
        {/* Sección de botones de eliminar y editar */}
        <div className="flex shrink-0 flex-col justify-between gap-3 px-3 py-4">
          {/* Botón eliminar */}
          <button
            onClick={() => onDelete?.(id)}
            disabled={isUpdating} // Deshabilitado mientras se actualiza
            className="text-error hover:text-errorHover shrink-0 cursor-pointer rounded-full p-1"
          >
            <Trash size={22} />
          </button>

          {/* Botón editar */}
          <button
            onClick={() => onEdit?.(id)}
            disabled={isUpdating} // Deshabilitado mientras se actualiza
            className="text-primaryHover hover:text-primary shrink-0 cursor-pointer rounded-full p-1"
          >
            <PencilLine size={22} />
          </button>
        </div>

        {/* Sección principal: etiqueta y descripción */}
        <div className="flex w-full min-w-0 flex-1 flex-col justify-center py-4 pr-2 text-right">
          {/* Etiqueta del hábito */}
          <h3
            className={clsx(
              "line-clamp-1 text-lg font-black tracking-wider capitalize duration-300 md:px-3 md:text-2xl"
            )}
          >
            {label}
          </h3>

          {/* Descripción del hábito */}
          {description && (
            <p
              className={clsx(
                "!text-text/80 line-clamp-2 w-full min-w-0 overflow-hidden px-0 text-xs text-ellipsis md:px-3 md:text-base"
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Botón para marcar completado / incompleto */}
        <div className="flex shrink-0 items-center">
          <button
            onClick={() => onToggleCompleted?.(id, !completed)}
            disabled={isUpdating} // Deshabilitado mientras se actualiza
            className={clsx(
              "h-full cursor-pointer rounded-lg p-3 transition duration-300 ease-in-out disabled:opacity-50",
              completed
                ? "bg-success text-surface hover:bg-success/80"
                : "bg-error hover:bg-errorHover text-surface"
            )}
          >
            {/* Icono según estado */}
            {completed ? <Ban size={22} /> : <Check size={22} />}
          </button>
        </div>
      </div>
    </div>
  );
}

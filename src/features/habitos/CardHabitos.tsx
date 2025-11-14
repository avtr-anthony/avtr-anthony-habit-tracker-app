"use client";
import clsx from "clsx";
import { Check, Ban, Trash, Edit } from "lucide-react";

export interface HabitosCardProps {
  id: string;
  label?: string;
  description?: string;
  completed?: boolean;
  onDelete?: (id: string) => void;
  onToggleCompleted?: (id: string, completed: boolean) => void;
  onEdit?: (id: string) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

export default function CardHabitos({
  id,
  label,
  description,
  completed = false,
  onDelete,
  onToggleCompleted,
  onEdit,
  isDeleting = false,
  isUpdating = false
}: HabitosCardProps) {
  const handleToggleCompleted = () => {
    if (onToggleCompleted && !isUpdating) {
      onToggleCompleted(id, !completed);
    }
  };

  const handleDelete = () => {
    if (onDelete && !isDeleting) {
      if (confirm("¿Estás seguro de que quieres eliminar este hábito?")) {
        onDelete(id);
      }
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    }
  };

  const classes = clsx(
    "rounded-lg shadow-xl/10 transition-colors duration-300 ease-in-out  w-full md:max-w-[450] h-auto flex text-right gap-3 overflow-hidden",
    {
      "bg-primary text-surface": completed,
      "bg-surface text-textSecondary ": !completed
    }
  );

  return (
    <div className={classes}>
      <div className="flex flex-col gap-1">
        <button
          onClick={handleEdit}
          disabled={isDeleting || isUpdating}
          className="text-secondary hover:text-primary cursor-pointer rounded-[100%] p-2 transition-all duration-300 ease-in-out disabled:opacity-50"
          title="Editar"
        >
          <Edit size={18} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeleting || isUpdating}
          className="text-error hover:text-errorHover cursor-pointer rounded-[100%] p-2 transition-all duration-300 ease-in-out disabled:opacity-50"
          title="Eliminar"
        >
          <Trash size={18} />
        </button>
      </div>
      <div className="flex w-full flex-col justify-center py-2">
        <h3
          className={clsx(
            "text-xl font-bold transition-colors duration-300 ease-in-out",
            completed ? "text-surface" : "text-text"
          )}
        >
          {label}
        </h3>

        {description && (
          <p
            className={clsx(
              "text-md line-clamp-1",
              completed ? "text-surface/80" : "text-textSecondary"
            )}
          >
            {description}
          </p>
        )}
      </div>

      <div className="flex h-full items-center">
        <button
          onClick={handleToggleCompleted}
          disabled={isDeleting || isUpdating}
          className={clsx(
            "text-surface h-full cursor-pointer p-2 transition duration-300 ease-in-out disabled:opacity-50",
            completed ? "bg-error hover:bg-errorHover" : "bg-primary hover:bg-primaryHover"
          )}
          title={completed ? "Marcar como incompleto" : "Marcar como completado"}
        >
          {completed ? <Ban size={20} /> : <Check size={20} />}
        </button>
      </div>
    </div>
  );
}

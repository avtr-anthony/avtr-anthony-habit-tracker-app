"use client";
import clsx from "clsx";
import { Check, Ban, Trash, PencilLine } from "lucide-react";

export interface HabitosCardProps {
  id: string;
  label?: string;
  description?: string;
  completed?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onToggleCompleted?: (id: string, completed: boolean) => void;
  isUpdating?: boolean;
}

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
  const classes = clsx(
    "rounded-lg shadow-lg/5 transition-colors duration-300 ease-in-out w-full max-w-[420px] md:min-w-[420px]  md:min-h-[118px] flex text-right gap-3 overflow-hidden ",
    {
      "bg-primary/40": completed,
      "bg-surface text-textSecondary": !completed
    }
  );

  return (
    <div className="pr-4 pb-4 md:pr-0 md:pb-0">
      <div className={classes}>
        <div className="flex flex-col justify-between gap-4 p-4">
          <button
            onClick={() => onDelete?.(id)}
            className="text-error hover:text-errorHover cursor-pointer rounded-[100%] transition-all duration-300 ease-in-out disabled:opacity-50"
            disabled={isUpdating}
          >
            <Trash />
          </button>
          <button
            onClick={() => onEdit?.(id)}
            className="text-accent hover:text-accentHover cursor-pointer transition-all duration-300 ease-in-out disabled:opacity-50"
            disabled={isUpdating}
          >
            <PencilLine />
          </button>
        </div>
        <div className="flex w-full flex-col justify-between py-4 pr-4 text-right">
          <h3 className="text-text text-lg font-bold capitalize transition-colors duration-300 ease-in-out">
            {label}
          </h3>

          {description && (
            <p
              className={clsx(
                "line-clamp-2 text-sm capitalize transition-colors duration-300 ease-in-out",
                completed ? "text-textSecondary" : "text-textSecondary"
              )}
            >
              {description}
            </p>
          )}
        </div>

        <div>
          <button
            onClick={() => onToggleCompleted?.(id, !completed)}
            className={clsx(
              "text-surface h-full cursor-pointer p-2 transition duration-300 ease-in-out disabled:opacity-50",
              completed ? "bg-error hover:bg-errorHover" : "bg-primary hover:bg-primaryHover"
            )}
            disabled={isUpdating}
            aria-label={completed ? "Marcar como no completado" : "Marcar como completado"}
          >
            {completed ? <Ban size={20} /> : <Check size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

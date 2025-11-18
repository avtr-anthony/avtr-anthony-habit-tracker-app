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
    "rounded-xl shadow-lg transition-colors duration-300 ease-in-out w-full max-w-[420px] md:min-w-[420px] h-auto flex text-right gap-3 overflow-hidden backdrop-blur-xl min-h-[100px] md:min-h-[120px]",
    {
      "bg-primary/50 ": completed,

      "bg-error/40  ": !completed
    }
  );

  return (
    <div className="h-fit pr-4 pb-4 md:pr-0 md:pb-0">
      <div className={classes}>
        <div className="flex flex-col justify-between p-4">
          <button
            onClick={() => onDelete?.(id)}
            className={clsx("cursor-pointer rounded-full text-red-400 hover:text-red-600")}
            disabled={isUpdating}
          >
            <Trash size={28} />
          </button>

          <button
            onClick={() => onEdit?.(id)}
            className={clsx(
              "cursor-pointer transition-colors duration-300 ease-in-out",
              completed
                ? "text-green-500 hover:text-green-700"
                : "text-yellow-500 hover:text-yellow-700"
            )}
            disabled={isUpdating}
          >
            <PencilLine size={28} />
          </button>
        </div>

        <div className="flex w-full flex-col justify-evenly pb-0 text-right">
          <h3
            className={clsx(
              "text-lg font-black tracking-wider capitalize duration-300 md:text-2xl"
            )}
          >
            {label}
          </h3>

          {description && (
            <p
              className={clsx(
                "md:text-md !text-text/80 line-clamp-2 text-sm capitalize transition-colors duration-300"
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
              "h-full cursor-pointer p-3 transition duration-300 ease-in-out disabled:opacity-50",
              completed
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-red-500 text-white hover:bg-red-600"
            )}
            disabled={isUpdating}
            aria-label={completed ? "Marcar como no completado" : "Marcar como completado"}
          >
            {completed ? <Ban size={25} /> : <Check size={25} />}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import clsx from "clsx";
import { Check, Ban, Trash } from "lucide-react";

export interface HabitosCardProps {
  id: string;
  label?: string;
  description?: string;
  onDelete?: (id: string) => void;
}

export default function CardHabitos({ id, label, description, onDelete }: HabitosCardProps) {
  const [completed, setCompleted] = useState(false);
  const toggleCompleted = () => setCompleted((prev) => !prev);

  const classes = clsx(
    "rounded-lg shadow-lg/5 transition-colors duration-300 ease-in-out  w-full md:max-w-[350px] md:min-w-[350px]  flex text-right gap-3 overflow-hidden",
    {
      "bg-primary/40 text-textSecondary": completed,
      "bg-surface text-textSecondary ": !completed
    }
  );

  return (
    <div className={classes}>
      <div>
        <button
          onClick={() => onDelete && onDelete(id)}
          className="text-error hover:text-errorHover cursor-pointer rounded-[100%] p-4 transition-all duration-300 ease-in-out"
        >
          <Trash />
        </button>
      </div>
      <div className="flex w-full flex-col justify-center py-4">
        <h3
          className={clsx(
            "text-xl font-bold capitalize transition-colors duration-300 ease-in-out",
            completed ? "text-text" : "text-text"
          )}
        >
          {label}
        </h3>

        {description && (
          <p className="text-surface text-md line-clamp-1 capitalize">{description}</p>
        )}
      </div>

      <div className="flex h-full">
        <button
          onClick={toggleCompleted}
          className={clsx(
            "text-surface h-full cursor-pointer p-2 transition duration-300 ease-in-out",
            completed ? "bg-error hover:bg-errorHover" : "bg-primary hover:bg-primaryHover"
          )}
        >
          {completed ? <Ban size={20} /> : <Check size={20} />}
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import clsx from "clsx";
import { Check, Ban } from "lucide-react";

export interface HabitosCardProps {
  label?: string;
  description?: string;
}

export default function CardHabitos({ label, description }: HabitosCardProps) {
  const [completed, setCompleted] = useState(false);
  const toggleCompleted = () => setCompleted((prev) => !prev);

  const classes = clsx(
    "p-4 rounded-xl shadow-lg/20 transition-colors duration-300 ease-in-out min-w-auto max-w-[400px] h-auto flex text-right gap-3",
    {
      "bg-primary text-surface": completed,
      "bg-error text-surface": !completed
    }
  );

  return (
    <div className={classes}>
      <div className="flex w-full flex-col justify-center">
        <h3 className="text-surface text-2xl font-bold">{label}</h3>

        {description && <p className="text-surface text-md opacity-[0.79]">{description}</p>}
      </div>

      <div className="flex h-full items-center">
        <button
          onClick={toggleCompleted}
          className={clsx(
            "text-surface cursor-pointer rounded-[100%] p-2 transition duration-300 ease-in-out",
            completed ? "bg-error hover:bg-errorHover" : "bg-primary hover:bg-primaryHover"
          )}
        >
          {completed ? <Ban size={20} /> : <Check size={20} />}
        </button>
      </div>
    </div>
  );
}

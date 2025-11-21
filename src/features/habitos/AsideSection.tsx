"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import { useDailyQuote } from "@/hooks/habitos/useDailyQuote";
import Calendar from "react-calendar";

interface CalendarioHabitosProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  habitosCount?: number;
  className?: string;
}

type CalendarValue = Date | Date[] | null;

// Calendario que permite seleccionar una fecha y muestra el total de hábitos del día
export default function CalendarioHabitos({
  selectedDate,
  onSelectDate,
  habitosCount,
  className
}: CalendarioHabitosProps) {
  const { quote, loading } = useDailyQuote();

  // Texto legible para mostrar la fecha seleccionada (ej: "martes, 19 de marzo de 2025")
  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("es-ES", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
      }).format(selectedDate),
    [selectedDate]
  );

  // Normaliza el valor emitido por react-calendar y notifica a la página la nueva fecha
  function handleChange(value: CalendarValue) {
    const nextDate = Array.isArray(value) ? value[0] : value;
    if (nextDate instanceof Date && !Number.isNaN(nextDate.getTime())) {
      onSelectDate(nextDate);
    }
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4">
      <aside
        className={clsx(
          "bg-surface/30 flex h-full w-full flex-1 flex-col rounded-lg p-4 shadow-xl/5 backdrop-blur-xl",
          className
        )}
      >
        {/* Encabezado informativo */}
        <div className="flex flex-col gap-1">
          <p className="text-xl font-semibold capitalize">{formattedDate}</p>
          {typeof habitosCount === "number" && (
            <span className="text-textSecondary text-sm">
              {habitosCount} hábito{habitosCount === 1 ? "" : "s"} programado
              {habitosCount === 1 ? "" : "s"}
            </span>
          )}
        </div>

        {/* Calendario interactivo */}
        <Calendar
          className="calendar-habitos"
          locale="es-ES"
          next2Label={null}
          prev2Label={null}
          onChange={(value, _event) => handleChange(value as CalendarValue)}
          value={selectedDate}
        />
      </aside>
      <div className="bg-surface/20 flex h-full flex-col justify-center gap-4 rounded-lg p-6 text-center shadow-xl/5 backdrop-blur-xl">
        <p className="text-textSecondary text-sm uppercase">Frase positiva del día</p>

        {loading ? (
          <p className="text-textSecondary text-sm">Cargando...</p>
        ) : (
          <blockquote className="text-text text-lg font-light italic md:text-xl">
            “{quote || "Sin frase disponible"}”
          </blockquote>
        )}
      </div>
    </div>
  );
}

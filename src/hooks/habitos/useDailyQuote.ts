"use client";

import { useEffect, useState } from "react";

export function useDailyQuote() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        // Buscar en localStorage
        const stored = localStorage.getItem("dailyQuote");
        const parsed = stored ? JSON.parse(stored) : null;

        // Aún válida ➝ usarla
        if (parsed && parsed.expires > Date.now()) {
          setQuote(parsed.text);
          setLoading(false);
          return;
        }

        // Sino, pedir nueva
        const res = await fetch("https://www.positive-api.online/phrase/esp", {
          cache: "no-store"
        });
        const data = await res.json();

        const text = data?.text ?? "";

        // Guardar nuevo valor con expiración a mañana a las 08:00
        const next = new Date();
        next.setDate(next.getDate() + 1);
        next.setHours(8, 0, 0, 0);

        localStorage.setItem("dailyQuote", JSON.stringify({ text, expires: next.getTime() }));

        setQuote(text);
      } catch {
        setQuote("");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { quote, loading };
}

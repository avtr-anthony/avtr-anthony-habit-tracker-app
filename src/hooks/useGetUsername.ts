"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { apiFetch } from "@/lib/apiClient";

interface UsernameResponse {
  username: string;
}

export function useGetUsername() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      // sin usuario, no hacemos fetch y devolvemos string vacío en el return
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const data = await apiFetch<UsernameResponse>(`/api/profile?uid=${user.uid}`);
        if (!cancelled) {
          setUsername(data.username);
        }
      } catch {
        if (!cancelled) {
          setUsername("");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  // Si no hay user, devolvemos vacío sin tocar estado en el efecto
  return user ? username : "";
}

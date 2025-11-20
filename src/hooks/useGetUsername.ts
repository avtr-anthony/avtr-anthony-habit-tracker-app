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
      setUsername("");
      return;
    }

    (async () => {
      try {
        const data = await apiFetch<UsernameResponse>(`/api/profile?uid=${user.uid}`);
        setUsername(data.username);
      } catch {
        setUsername("");
      }
    })();
  }, [user]);

  return username;
}

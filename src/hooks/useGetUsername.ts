"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export function useGetUsername() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      setUsername("");
      return;
    }

    (async () => {
      const res = await fetch(`/api/profile?uid=${user.uid}`);
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username);
      }
    })();
  }, [user]);

  return username;
}

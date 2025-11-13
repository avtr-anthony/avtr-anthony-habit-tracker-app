"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function useGetUsername() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const res = await fetch(`/api/profile?uid=${user.uid}`);
        if (res.ok) {
          const data = await res.json();
          setUsername(data.username);
        }
      } else {
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);

  return username;
}

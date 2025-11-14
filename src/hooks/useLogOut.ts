"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authService";

export function useLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await logoutUser();

      document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;

      await new Promise((resolve) => setTimeout(resolve, 700));

      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setLoading(false);
    }
  }

  return { logout, loading };
}

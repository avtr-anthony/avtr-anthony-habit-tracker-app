"use client";

import { useRouter } from "next/navigation";
import { logoutUser } from "@/lib/authService";

export function useLogout() {
  const router = useRouter();

  async function logout() {
    await logoutUser();
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    router.push("/login");
  }

  return logout;
}

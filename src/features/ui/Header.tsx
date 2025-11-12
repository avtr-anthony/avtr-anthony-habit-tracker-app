"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "@/lib/authService";
import Logo from "./Logo";
import Button from "./Button";
interface HeaderButton {
  label: string;
  href?: string;
}

interface HeaderProps {
  variant?: "hDefault" | "hPanelNormal" | "hPanelTel";
  showUser?: boolean;
  buttons?: HeaderButton[];
}

export default function Header({
  variant = "hDefault",
  showUser = false,
  buttons = []
}: HeaderProps) {
  const [username, setUsername] = useState("");
  const router = useRouter();

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

  async function handleLogout() {
    try {
      await logoutUser();
      document.cookie = "token=${idToken}; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  const headerClass = clsx("flex w-full text-surface  shadow-xl z-1", {
    "bg-primary  ": variant === "hDefault",
    "bg-surface text-primary": variant === "hPanelNormal",
    "bg-secondary text-surface": variant === "hPanelTel"
  });

  return (
    <header className={headerClass}>
      <div className="x flex w-full flex-col items-start justify-end p-4 sm:px-6 md:px-10">
        <Logo />

        <div className="flex w-full items-center justify-between">
          {showUser && username && (
            <p className="text-surface flex text-xl font-bold tracking-wide md:text-3xl">
              Hola, <span className="text-text">{username}</span>
            </p>
          )}
          {showUser && <Button label="Cerrar Sesión" onClick={handleLogout} variant="close" />}
        </div>
        <div className="flex min-w-full items-center gap-2 lg:justify-end">
          {buttons.map((btn, i) => (
            <Button key={i} label={btn.label} href={btn.href} variant={variant} />
          ))}
        </div>
      </div>
    </header>
  );
}

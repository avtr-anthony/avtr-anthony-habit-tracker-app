"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { logoutUser } from "@/lib/authService";
import Link from "next/link";
import Logo from "./Logo";

interface HeaderButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "close";
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

  const headerClass = clsx("flex w-full text-surface", {
    "bg-primary": variant === "hDefault",
    "bg-surface text-primary": variant === "hPanelNormal",
    "bg-secondary text-surface": variant === "hPanelTel"
  });

  const buttonClass = (variant: "primary" | "outline" | "close" = "primary") =>
    clsx(
      "px-4 py-1 rounded-lg transition duration-300 ease-in-out text-sm sm:text-base font-medium cursor-pointer",
      variant === "primary" && "bg-surface text-primary hover:opacity-90",
      variant === "outline" && "border border-white text-white hover:bg-surface hover:text-primary",
      variant === "close" && "bg-error text-surface hover:bg-errorHover"
    );

  return (
    <header className={headerClass}>
      <div className="flex w-full flex-col items-start justify-center p-4 sm:px-6 md:px-10">
        <Logo />
        <hr className="my-2 w-full opacity-70" />
        <div className="flex w-full items-center gap-3">
          <div className="mr-20 min-w-fit">
            {showUser && username && (
              <p className="text-surface text-xl font-bold tracking-wide md:text-3xl">
                Hola, <span className="text-text">{username}</span>
              </p>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            {buttons.map((btn, i) =>
              btn.href ? (
                <Link
                  key={i}
                  href={btn.href}
                  onClick={btn.onClick}
                  className={buttonClass(btn.variant)}
                >
                  {btn.label}
                </Link>
              ) : (
                <button key={i} onClick={btn.onClick} className={buttonClass(btn.variant)}>
                  {btn.label}
                </button>
              )
            )}
          </div>
          <div className="flex w-full items-center justify-end gap-2">
            {showUser && (
              <button onClick={handleLogout} className={buttonClass("close")}>
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";
import clsx from "clsx";
import Logo from "@/features/ui/Logo";
import Button from "@/features/ui/Button";
import { useGetUsername } from "@/hooks/useGetUsername";

interface HeaderButton {
  label: string;
  href?: string;
  variant?: "primary" | "outline" | "close";
}

interface HeaderProps {
  variant?: "hDefault" | "hPanel";
  showUser?: boolean;
  buttons?: HeaderButton[];
  onClick?: () => void;
}

export default function Header({
  variant = "hDefault",
  showUser = false,
  buttons = [],
  onClick
}: HeaderProps) {
  const username = useGetUsername();

  const headerClass = clsx(
    "w-full bg-primary text-surface shadow-xl z-1 p-4 sm:px-6 md:px-10 flex",
    variant === "hDefault" ? "flex-row items-center justify-between" : "flex-col items-start "
  );

  return (
    <header className={headerClass}>
      <Logo />

      <div className="flex w-full items-center justify-end gap-2">
        {buttons.map((btn, i) => (
          <Button key={i} label={btn.label} href={btn.href} variant={btn.variant} />
        ))}
      </div>

      {variant === "hPanel" && showUser && (
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-bold md:text-3xl">
            Hola, <span className="text-text">{username}</span>
          </p>
          <Button label="Cerrar Sesión" onClick={onClick} variant="close" />
        </div>
      )}
    </header>
  );
}

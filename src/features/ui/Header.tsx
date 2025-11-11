import clsx from "clsx";
import Link from "next/link";
import Logo from "./Logo";

interface HeaderProps {
  buttons?: { label: string; href: string; variant?: "primary" | "outline" }[];
}

export default function Header({ buttons = [] }: HeaderProps) {
  const buttonClass = (variant: "primary" | "outline" = "primary") =>
    clsx(
      "px-4 py-1 rounded-lg transition text-sm sm:text-base font-medium",
      variant === "primary" && "bg-surface text-primary hover:opacity-90",
      variant === "outline" && "border border-white text-white hover:bg-surface hover:text-primary"
    );

  return (
    <header className="bg-primary w-full text-white">
      <div
        className={clsx(
          "flex flex-wrap items-center justify-between p-4 sm:px-6 md:px-10",
          buttons.length > 0 && "gap-3"
        )}
      >
        <Logo />
        {buttons.length > 0 && (
          <nav className="flex w-full flex-wrap justify-start gap-2 sm:w-auto sm:justify-end sm:gap-3">
            {buttons.map((btn, i) => (
              <Link key={i} href={btn.href} className={buttonClass(btn.variant)}>
                {btn.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

import clsx from "clsx";
import Link from "next/link";
import Logo from "./Logo";

interface HeaderProps {
  buttons?: {
    label: string;
    href: string;
    onClick?: () => void;
    variant?: "primary" | "outline" | "close";
  }[];
  children?: React.ReactNode;
}

export default function Header({ buttons = [], children }: HeaderProps) {
  const buttonClass = (variant: "primary" | "outline" | "close" = "primary") =>
    clsx(
      "px-4 py-1 rounded-lg transition duration-300 ease-in-out text-sm sm:text-base font-medium",
      variant === "primary" && "bg-surface text-primary hover:opacity-90",
      variant === "outline" && "border border-white text-white hover:bg-surface hover:text-primary",
      variant === "close" && "bg-error text-surface hover:bg-errorHover"
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
          <nav className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3">
            {children}
            {buttons.map((btn, i) => (
              <Link
                key={i}
                href={btn.href}
                onClick={btn.onClick}
                className={buttonClass(btn.variant)}
              >
                {btn.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

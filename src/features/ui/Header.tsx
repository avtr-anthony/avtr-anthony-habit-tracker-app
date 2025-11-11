import Link from "next/link";
import Logo from "./Logo";

interface HeaderProps {
  buttons?: { label: string; href: string; variant?: "primary" | "outline" }[];
}

export default function Header({ buttons = [] }: HeaderProps) {
  return (
    <header className="bg-primary text-white w-full">
      <div className=" flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6 md:px-10">
        <Logo />
        <nav className="flex flex-wrap justify-start sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          {buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn.href}
              className={
                btn.variant === "outline"
                  ? "border border-white px-4 py-1 rounded-lg hover:bg-surface hover:text-primary transition text-sm sm:text-base"
                  : "bg-surface text-primary px-4 py-1 rounded-lg hover:opacity-90 transition text-sm sm:text-base"
              }
            >
              {btn.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

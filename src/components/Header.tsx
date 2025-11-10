import Link from "next/link";
import Logo from "./Logo";

interface HeaderProps {
  buttons?: { label: string; href: string; variant?: "primary" | "outline" }[];
}

export default function Header({ buttons = [] }: HeaderProps) {
  const styles = {
    headerStyle: "bg-primary p-4 flex justify-between items-center text-white",
  };

  return (
    <header className={styles.headerStyle}>
      <Logo />

      <nav className="flex gap-3">
        {buttons.map((btn, i) => (
          <Link
            key={i}
            href={btn.href}
            className={
              btn.variant === "outline"
                ? "border border-white px-4 py-1 rounded-lg hover:bg-surface hover:text-primary transition"
                : "bg-surface text-primary px-4 py-1 rounded-lg hover:opacity-90 transition"
            }
          >
            {btn.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

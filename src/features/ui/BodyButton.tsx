import Link from "next/link";

export interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit";
}

export default function Button({
  label,
  href,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex justify-center items-center px-6 sm:px-7 py-3 rounded-lg font-medium text-sm sm:text-base transition focus:outline-none focus:ring-2 focus:ring-primary";
  const variants = {
    primary: "bg-primary text-white hover:bg-primaryHover cursor-pointer",
    secondary: "bg-secondary text-white hover:opacity-90",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
  };

  if (href) {
    return (
      <Link href={href} className={`${base} ${variants[variant]}`}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}

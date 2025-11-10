interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  type?: "button" | "submit";
}

export default function Button({
  label,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const base = "px-7 py-3 rounded-lg font-medium transition";
  const variants = {
    primary: "bg-primary text-white hover:bg-primaryHover cursor-pointer",
    secondary: "bg-secondary text-white hover:opacity-90",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
  };

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

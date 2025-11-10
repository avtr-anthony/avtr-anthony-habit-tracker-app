import Link from "next/link";
import { NotebookPen } from "lucide-react";

export default function Logo() {
  return (
    <div className="bg-primary flex align-center">
      <Link
        href="/"
        className="text-surface uppercase tracking-wide font-black text-5xl flex gap-1 items-center"
      >
        <NotebookPen width={40} height={40} />
        Habiario
      </Link>
    </div>
  );
}

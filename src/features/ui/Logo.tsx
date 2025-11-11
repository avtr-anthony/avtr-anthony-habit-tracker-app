import Link from "next/link";
import { NotebookPen } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="flex items-center gap-2 font-black uppercase tracking-wide text-surface text-3xl sm:text-4xl md:text-5xl"
      >
        <NotebookPen className="w-7 h-7 sm:w-9 sm:h-9" />
        Habiario
      </Link>
    </div>
  );
}

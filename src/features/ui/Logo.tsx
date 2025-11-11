import Link from "next/link";
import { NotebookPen } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link
        href="/"
        className="text-surface flex items-center gap-2 text-3xl font-black tracking-wide uppercase sm:text-4xl md:text-5xl"
      >
        <NotebookPen className="h-7 w-7 sm:h-9 sm:w-9" />
        Habiario
      </Link>
    </div>
  );
}

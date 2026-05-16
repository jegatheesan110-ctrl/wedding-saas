import Link from "next/link";
import { APP_NAME } from "@/data/templates";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#FAF7F2] shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-tamil text-2xl font-bold text-[#D4AF37]">
          {APP_NAME}
        </Link>

        <nav className="flex items-center gap-8 text-sm text-[#1a1a2e]">
          <Link href="/templates" className="font-medium hover:text-[#D4AF37] transition-colors">
            Templates
          </Link>
        </nav>
      </div>
    </header>
  );
}

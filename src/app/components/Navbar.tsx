"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "🐢 Accueil" },
  { href: "/game", label: "OMICIDE 🎮" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-green-200 border-b-4 border-green-500 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex gap-6 items-center">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              "font-semibold text-green-800 hover:text-green-900 transition",
              pathname === href && "underline decoration-2 decoration-green-600"
            )}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

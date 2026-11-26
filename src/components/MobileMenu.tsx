"use client";

import Link from "next/link";
import { useState } from "react";
import { pages } from "@/lib/site";

// เมนูมือถือ: กด ☰ เปิด · ปิดเองเมื่อกดลิงก์
export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-xl"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="เมนูหลัก (มือถือ)"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-forest px-6 pb-6 pt-2 shadow-xl"
        >
          {pages.map((p) => (
            <Link
              key={p.path}
              href={p.path}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-4 text-lg font-normal hover:text-gold-light"
            >
              {p.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}

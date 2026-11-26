import Image from "next/image";
import Link from "next/link";
import { menuPages, site } from "@/lib/site";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-forest text-white">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" aria-label={site.name}>
          <Image
            src={site.logo}
            alt={site.name}
            width={4267}
            height={1367}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* PC: เมนูเต็ม */}
        <nav className="hidden gap-8 text-sm font-normal md:flex" aria-label="เมนูหลัก">
          {menuPages.map((p) => (
            <Link key={p.path} href={p.path} className="hover:text-gold-light">
              {p.label}
            </Link>
          ))}
        </nav>

        {/* มือถือ: ปุ่มเปิดเมนู */}
        <MobileMenu />
      </div>
      <div className="gold-line" />
    </header>
  );
}

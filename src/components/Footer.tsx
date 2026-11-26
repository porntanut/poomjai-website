import { site } from "@/lib/site";

export default function Footer() {
  const c = site.contact;
  return (
    <footer className="bg-forest text-white">
      <div className="gold-line" />
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">{site.name}</p>
          <p className="mt-2 text-white/80">{c.address}</p>
        </div>
        <div className="space-y-1 text-white/80">
          <p>สำนักงานใหญ่ {c.phoneHQ}</p>
          <p>อีเมล {c.email}</p>
          <p>LINE {c.line}</p>
        </div>
        <div className="flex gap-4 md:justify-end">
          <a href={c.facebook} target="_blank" rel="noopener" className="hover:text-gold-light">Facebook</a>
          <a href={c.instagram} target="_blank" rel="noopener" className="hover:text-gold-light">Instagram</a>
          <a href={c.tiktok} target="_blank" rel="noopener" className="hover:text-gold-light">TikTok</a>
          <a href={c.lineUrl} target="_blank" rel="noopener" className="hover:text-gold-light">LINE</a>
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-white/60">
        © {site.nameEn} · บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อมูลโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
      </p>
    </footer>
  );
}

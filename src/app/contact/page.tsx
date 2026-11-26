import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ติดต่อเรา นัดชมโครงการ",
  description:
    "ติดต่อภูมิใจนิเวศน์ สำนักงานใหญ่ 02-819-7977 · LINE @poomjainivate · สำนักงานขายสุขสวัสดิ์และเทพารักษ์–บางบ่อ นัดชมบ้านจริงและปรึกษาสินเชื่อ",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const c = site.contact;
  const rows = [
    { label: "สำนักงานใหญ่", value: c.phoneHQ },
    { label: "สำนักงานขาย สุขสวัสดิ์ (ภูมิใจ ไพร์ม / ไพร์ม 2)", value: c.phoneSukhumvit.join(" · ") },
    { label: "สำนักงานขาย เทพารักษ์–บางบ่อ", value: c.phoneTheparak },
    { label: "อีเมล", value: c.email },
    { label: "LINE OA", value: c.line },
    { label: "ที่อยู่สำนักงานใหญ่", value: c.address },
  ];
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl">ติดต่อเรา</h1>
      <div className="gold-line mt-4 w-24" />
      <dl className="mt-8 divide-y divide-sage-light">
        {rows.map((r) => (
          <div key={r.label} className="grid gap-1 py-4 sm:grid-cols-3">
            <dt className="font-normal">{r.label}</dt>
            <dd className="sm:col-span-2">{r.value}</dd>
          </div>
        ))}
      </dl>
      <a
        href={c.lineUrl}
        target="_blank"
        rel="noopener"
        className="mt-8 inline-block rounded-full bg-forest px-8 py-3 font-normal text-white hover:bg-slate-green"
      >
        ทัก LINE พิมพ์คำว่า &quot;อยากมีบ้าน&quot;
      </a>
    </section>
  );
}

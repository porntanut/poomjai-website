import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/lib/projects";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "โครงการบ้านและทาวน์โฮม",
  description:
    "รวมโครงการของภูมิใจนิเวศน์ ภูมิใจ ไพร์ม · ภูมิใจ ไพร์ม 2 · ภูมิใจ ไพร์ม ลักซ์ · ภูมิใจ ไพร์ม ทาวน์ · ภูมิใจนิเวศน์ เทพารักษ์ บ้านคุณภาพ ทำเลดี ราคาคุ้มค่า",
  alternates: { canonical: "/projects" },
};

// รายการโครงการแบบ JSON-LD ให้ Google และ AI อ่านได้ตรง ๆ
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `โครงการของ${site.name}`,
  url: `${siteUrl}/projects`,
  itemListElement: projects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "GatedResidenceCommunity",
      name: p.name,
      description: p.detail,
      ...(p.area && {
        address: { "@type": "PostalAddress", addressLocality: p.area, addressCountry: "TH" },
      }),
      provider: { "@id": `${siteUrl}/#organization` },
    },
  })),
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <JsonLd data={jsonLd} />
      <h1 className="text-3xl md:text-4xl">โครงการของเรา</h1>
      <div className="gold-line mt-4 w-24" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <article key={p.name} className="rounded-2xl bg-sage-light p-6">
            <h2 className="text-xl">{p.name}</h2>
            <p className="mt-3">{p.detail}</p>
          </article>
        ))}
      </div>
      <p className="mt-10 text-xs text-forest/70">
        *รายละเอียดเงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
        บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
      </p>
    </section>
  );
}

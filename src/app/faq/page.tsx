import type { Metadata } from "next";
import Link from "next/link";
import { publishedFaqGroups } from "@/lib/faq";
import { site, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "คำถามที่พบบ่อย (Q&A)",
  description:
    "รวมคำถามที่พบบ่อยเกี่ยวกับภูมิใจนิเวศน์ แบบบ้าน ภูมิใจ ไพร์ม 2 ทำเลสุขสวัสดิ์-ประชาอุทิศ และเทพารักษ์-บางบ่อ สินเชื่อบ้าน รายได้ที่ควรมีก่อนยื่นกู้ และการนัดชมบ้านจริง",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  // ข้อมูลแบบ FAQPage ให้ Google และ AI อ่านคำถาม-คำตอบได้ตรง ๆ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: `${siteUrl}/faq`,
    publisher: { "@type": "Organization", name: site.name, alternateName: site.nameEn, url: siteUrl },
    mainEntity: publishedFaqGroups.flatMap((g) =>
      g.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    ),
  };

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <h1 className="text-3xl md:text-4xl">คำถามที่พบบ่อย</h1>
      <div className="gold-line mt-4 w-24" />
      <p className="mt-6 text-lg text-slate-green">
        รวมคำถามที่ลูกค้าถามภูมิใจนิเวศน์บ่อย ตั้งแต่แบบบ้าน ทำเล สินเชื่อ ไปจนถึงการนัดชมบ้านจริง
      </p>

      {publishedFaqGroups.map((g) => (
        <div key={g.title} className="mt-12">
          <h2 className="text-2xl text-forest">{g.title}</h2>
          <div className="mt-4 divide-y divide-sage-light border-y border-sage-light">
            {g.items.map((f) => (
              <article key={f.q} className="py-5">
                <h3 className="text-lg text-forest">{f.q}</h3>
                <p className="mt-2 leading-relaxed">{f.a}</p>
                {f.link &&
                  (f.link.href.startsWith("http") ? (
                    <a
                      href={f.link.href}
                      target="_blank"
                      rel="noopener"
                      className="mt-2 inline-block text-sm text-gold-dark underline underline-offset-4 hover:text-forest"
                    >
                      {f.link.label} →
                    </a>
                  ) : (
                    <Link
                      href={f.link.href}
                      className="mt-2 inline-block text-sm text-gold-dark underline underline-offset-4 hover:text-forest"
                    >
                      {f.link.label} →
                    </Link>
                  ))}
              </article>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-12 rounded-2xl bg-forest p-6 text-white">
        <p className="text-lg">ยังมีคำถามอื่นอีกไหม?</p>
        <p className="mt-1 text-sm text-white/80">
          ทีมภูมิใจนิเวศน์ยินดีให้คำปรึกษา โทร {site.contact.phoneHQ} หรือ LINE {site.contact.line}
        </p>
        <a
          href={site.contact.lineUrl}
          target="_blank"
          rel="noopener"
          className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-forest hover:bg-gold-light"
        >
          ทัก LINE พิมพ์ &quot;อยากมีบ้าน&quot;
        </a>
      </div>
    </section>
  );
}

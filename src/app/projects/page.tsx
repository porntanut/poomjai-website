import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "โครงการบ้านและทาวน์โฮม",
  description:
    "รวมโครงการของภูมิใจนิเวศน์ ภูมิใจ ไพร์ม · ภูมิใจ ไพร์ม 2 · ภูมิใจ ไพร์ม ลักซ์ · ภูมิใจ ไพร์ม ทาวน์ · ภูมิใจนิเวศน์ เทพารักษ์ บ้านคุณภาพ ทำเลดี ราคาคุ้มค่า",
  alternates: { canonical: "/projects" },
};

const projects = [
  {
    name: "ภูมิใจ ไพร์ม 2",
    detail:
      "ทาวน์โฮม 2 ชั้น กว้าง 4 เมตร 2 ห้องนอน 2 ห้องน้ำ พื้นที่ใช้สอย 74 ตร.ม. ทำเลสุขสวัสดิ์-ประชาอุทิศ",
  },
  { name: "ภูมิใจ ไพร์ม", detail: "ทำเลสุขสวัสดิ์-ประชาอุทิศ" },
  { name: "ภูมิใจ ไพร์ม ลักซ์", detail: "รายละเอียดโครงการเร็ว ๆ นี้" },
  { name: "ภูมิใจ ไพร์ม ทาวน์", detail: "รายละเอียดโครงการเร็ว ๆ นี้" },
  { name: "ภูมิใจนิเวศน์ เทพารักษ์", detail: "ทำเลเทพารักษ์–บางบ่อ" },
];

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
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

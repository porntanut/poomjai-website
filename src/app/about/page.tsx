import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "รู้จักภูมิใจนิเวศน์ ผู้พัฒนาที่อยู่อาศัยประสบการณ์กว่า 40 ปี สร้างมาแล้วกว่า 30 โครงการ มากกว่า 7,000 ยูนิต เราไม่ได้ขายแค่บ้าน แต่ขายความมั่นใจในการมีบ้าน",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl md:text-4xl">เกี่ยวกับภูมิใจนิเวศน์</h1>
      <div className="gold-line mt-4 w-24" />
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        <p>
          ภูมิใจนิเวศน์ขอเป็นส่วนหนึ่งในก้าวแรกแห่งความมั่นคงของคุณ
          ด้วยประสบการณ์กว่า 40 ปี เราสร้างบ้านมาแล้วกว่า 30 โครงการ มากกว่า 7,000 ยูนิต
        </p>
        <p>
          เราไม่ได้ขายแค่บ้าน แต่ขายความมั่นใจในการมีบ้าน
          บ้านคุ้มค่า พร้อมอยู่ ซื้อได้อย่างมั่นใจ
          และมีคนดูแลตั้งแต่ก่อนซื้อจนถึงหลังเข้าอยู่
        </p>
        <p>
          ทีมงานพร้อมให้คำปรึกษาเรื่องสินเชื่อ และเตรียมความพร้อมก่อนยื่นกู้
          <span className="text-sm text-forest/70"> (ผลอนุมัติขึ้นอยู่กับธนาคาร)</span>
        </p>
      </div>
    </section>
  );
}

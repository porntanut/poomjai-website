import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import HeroSlider, { type HeroSlide } from "@/components/HeroSlider";
import VirtualTour from "@/components/VirtualTour";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | บ้านคุณภาพ ทำเลดี ราคาคุ้มค่า` },
  description:
    "ภูมิใจนิเวศน์ ขอเป็นส่วนหนึ่งในก้าวแรกแห่งความมั่นคง ทาวน์โฮมและบ้านเดี่ยว ภูมิใจ ไพร์ม 2 สุขสวัสดิ์-ประชาอุทิศ พร้อม Virtual Tour ชมบ้านแบบ 360° จากผู้พัฒนาที่มีประสบการณ์กว่า 40 ปี",
  alternates: { canonical: "/" },
};

const IMG = "/images/home";
const TOUR_URL = "https://realsee.ai/VbOOEOZA";

// ---------- สไลด์ด้านบน ----------
const slides: HeroSlide[] = [
  {
    type: "banner",
    src: `${IMG}/hero-cover-banner.webp`,
    blur: `${IMG}/hero-cover-banner-blur.webp`,
    width: 2400,
    height: 888,
    alt: "บ้าน...ที่ดี ชีวิตที่ลงตัว ทาวน์โฮม และบ้านเดี่ยว 2 ที่สุดแห่งทำเล สุขสวัสดิ์-ประชาอุทิศ และเทพารักษ์-บางบ่อ ใกล้รถไฟฟ้าสายสีม่วงใต้ ใกล้เมกาบางนา แหล่งช้อปปิ้ง โรงเรียน และโรงพยาบาล",
    href: "/projects",
  },
  {
    type: "image",
    desktop: `${IMG}/hero-townhome-row-desktop.webp`,
    mobile: `${IMG}/hero-townhome-row-mobile.webp`,
    alt: "ทาวน์โฮม 2 ชั้น ภูมิใจ ไพร์ม 2 โครงการ 2 หน้าบ้านโทนขาวสลับลายไม้ เรียงเป็นแถว มีรั้วและสนามหญ้าหน้าบ้าน",
    eyebrow: "ภูมิใจ ไพร์ม 2 · โครงการ 2",
    title: "ทาวน์โฮม กว้าง 4 เมตร Modern Minimal Living",
    text: "2 ห้องนอน 2 ห้องน้ำ พื้นที่ใช้สอย 74 ตร.ม. บนทำเลสุขสวัสดิ์-ประชาอุทิศ",
    cta: { label: "ชม Virtual Tour", href: "#virtual-tour" },
  },
  {
    type: "video",
    src: "/videos/single-house-tour.mp4",
    poster: `${IMG}/hero-video-poster.webp`,
    alt: "วิดีโอพาชมบ้านเดี่ยว ภูมิใจ ไพร์ม 2 ตั้งแต่หน้าบ้าน ห้องนั่งเล่น ห้องทานอาหาร ห้องนอน จนถึงห้องครัว",
    eyebrow: "ภูมิใจ ไพร์ม 2 · บ้านเดี่ยว",
    title: "พาชมบ้านเดี่ยวทุกมุม",
    text: "บ้านเดี่ยว 2 ชั้น 3 ห้องนอน 3 ห้องน้ำ พื้นที่ใช้สอย 130–162 ตร.ม.",
    cta: { label: "ดูแบบบ้านเดี่ยว", href: "/projects" },
  },
  {
    type: "image",
    desktop: `${IMG}/hero-single-house-desktop.webp`,
    mobile: `${IMG}/hero-single-house-mobile.webp`,
    alt: "บ้านเดี่ยว 2 ชั้น สีเทาครีม มีระเบียงชั้นบน ที่จอดรถในตัว และสวนหน้าบ้านพร้อมทางเดินหิน",
    eyebrow: "ภูมิใจ ไพร์ม 2 · บ้านเดี่ยว",
    title: "บ้านหลังใหญ่ สำหรับครอบครัวที่เติบโต",
    text: "พื้นที่อเนกประสงค์ ที่จอดรถ 2 คัน เลือกได้ทั้งแบบ PRIME และ GRAND PRIME",
    cta: { label: "นัดชมบ้านจริง", href: "/contact" },
  },
  {
    type: "image",
    desktop: `${IMG}/hero-living-room-desktop.webp`,
    mobile: `${IMG}/hero-living-room-mobile.webp`,
    alt: "ห้องนั่งเล่นในทาวน์โฮม ตกแต่งโทนขาวและไม้อ่อน มีโซฟาสีเทาอ่อน ชั้นวางของ และโต๊ะทานอาหารด้านใน",
    eyebrow: "ภูมิใจ ไพร์ม 2 · โครงการ 1",
    title: "ทาวน์โฮมพร้อมอยู่ ฟังก์ชันครบ",
    text: "เริ่มต้นชีวิตในบ้านใหม่ได้ทันที พร้อมมีคนดูแลตั้งแต่ก่อนซื้อจนถึงหลังเข้าอยู่",
    cta: { label: "ดูโครงการ", href: "/projects" },
  },
  {
    type: "image",
    desktop: `${IMG}/hero-townhome-garden-desktop.webp`,
    mobile: `${IMG}/hero-townhome-garden-mobile.webp`,
    alt: "ทาวน์โฮมหลังริม ภูมิใจ ไพร์ม 2 โครงการ 2 มีสนามหญ้าข้างบ้าน ทางเดินหิน และแนวพุ่มไม้",
    eyebrow: "ภูมิใจนิเวศน์",
    title: "ขอเป็นส่วนหนึ่งในก้าวแรก แห่งความมั่นคง",
    text: "บ้านคุณภาพ ทำเลดี ราคาคุ้มค่า จากผู้พัฒนาที่มีประสบการณ์กว่า 40 ปี",
    cta: { label: "รู้จักเรา", href: "/about" },
  },
];

const stats = [
  { value: "40+", label: "ปีแห่งประสบการณ์" },
  { value: "30+", label: "โครงการ" },
  { value: "7,000+", label: "ยูนิต" },
];

// ---------- โครงการแนะนำ ----------
const projects = [
  {
    name: "ภูมิใจ ไพร์ม 2 โครงการ 1",
    type: "ทาวน์โฮม 2 ชั้น",
    detail: "ทาวน์โฮมพร้อมอยู่ ฟังก์ชันครบ ทำเลสุขสวัสดิ์-ประชาอุทิศ",
    image: `${IMG}/card-prime2-phase1.webp`,
    alt: "หน้าบ้านทาวน์โฮม 2 ชั้น ภูมิใจ ไพร์ม 2 โครงการ 1 โทนเทาและครีม มีระเบียงชั้นบน",
    href: "/projects",
  },
  {
    name: "ภูมิใจ ไพร์ม 2 โครงการ 2",
    type: "ทาวน์โฮม กว้าง 4 เมตร",
    detail: "2 ห้องนอน 2 ห้องน้ำ 74 ตร.ม. เนื้อที่ 16.5 ตร.วา · มี Virtual Tour",
    image: `${IMG}/card-prime2-phase2.webp`,
    alt: "ทาวน์โฮมหลังริม ภูมิใจ ไพร์ม 2 โครงการ 2 ผนังสีขาวสลับลายไม้ ประตูกระจกบานใหญ่",
    href: "#virtual-tour",
  },
  {
    name: "ภูมิใจ ไพร์ม 2 บ้านเดี่ยว",
    type: "บ้านเดี่ยว 2 ชั้น",
    detail: "แบบ PRIME 130 ตร.ม. และ GRAND PRIME 162 ตร.ม. · 3 ห้องนอน 3 ห้องน้ำ",
    image: `${IMG}/card-prime2-single-house.webp`,
    alt: "บ้านเดี่ยว 2 ชั้น ภูมิใจ ไพร์ม 2 สีเทาครีม มีระเบียงและสวนหน้าบ้าน",
    href: "/projects",
  },
];

// ---------- จุดเด่น (จาก Brand Context) ----------
const reasons = [
  { icon: "🏡", title: "บ้านพร้อมอยู่", text: "ย้ายเข้าอยู่ได้เร็ว เห็นบ้านจริงก่อนตัดสินใจ" },
  { icon: "💬", title: "ให้คำปรึกษาเรื่องสินเชื่อ", text: "ช่วยเตรียมความพร้อมก่อนยื่นกู้ *ผลอนุมัติขึ้นอยู่กับธนาคาร" },
  { icon: "🤝", title: "มีคนดูแลตลอดทาง", text: "ตั้งแต่ก่อนซื้อ วันโอน จนถึงหลังเข้าอยู่" },
  { icon: "📍", title: "การเดินทางสะดวก", text: "ทำเลสุขสวัสดิ์-ประชาอุทิศ เชื่อมต่อทุกเส้นทาง" },
];

// ---------- ภายในบ้าน ----------
const interiors = [
  { src: `${IMG}/interior-townhome-living.webp`, alt: "ห้องนั่งเล่นทาวน์โฮม มีทีวี ชั้นวางไม้ และประตูกระจกออกสวน" },
  { src: `${IMG}/interior-single-living.webp`, alt: "ห้องนั่งเล่นบ้านเดี่ยว โซฟาโค้งสีครีม โคมไฟคริสตัล และพรมขาว" },
  { src: `${IMG}/interior-single-dining.webp`, alt: "มุมทานอาหารบ้านเดี่ยว โต๊ะหินอ่อนสีขาว เก้าอี้สีครีม 6 ตัว" },
  { src: `${IMG}/interior-single-kitchen.webp`, alt: "ห้องครัวบ้านเดี่ยว ตู้สีขาว เตาอบบิวท์อิน และหน้าต่างเหนืออ่างล้างจาน" },
];

export default function Home() {
  const c = site.contact;
  return (
    <>
      <h1 className="sr-only">{site.name} — {site.tagline}</h1>
      <HeroSlider slides={slides} />

      {/* สถิติบริษัท */}
      <section className="bg-forest px-6 py-12 text-white md:py-16">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-4 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-semibold text-cream md:text-5xl">{s.value}</p>
              <p className="mt-2 text-sm text-white/80 md:text-base">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* โครงการแนะนำ */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm tracking-widest text-slate-green">OUR PROJECTS</p>
            <h2 className="mt-2 text-3xl md:text-4xl">โครงการแนะนำ</h2>
            <div className="gold-line mt-4 w-24" />
          </div>
          <Link href="/projects" className="text-sm font-normal underline underline-offset-4 hover:text-slate-green">
            ดูโครงการทั้งหมด →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-forest/10 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-forest/85 px-3 py-1 text-xs text-white">
                  {p.type}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl">{p.name}</h3>
                <p className="mt-2 text-sm text-forest/80">{p.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Virtual Tour — ภูมิใจ ไพร์ม 2 โครงการ 2 */}
      <section id="virtual-tour" className="scroll-mt-20 bg-gradient-to-b from-sage-light to-sage px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-sm tracking-widest text-forest/70">VIRTUAL TOUR 360°</p>
            <h2 className="mt-2 text-3xl md:text-4xl">ภูมิใจ ไพร์ม 2 โครงการ 2</h2>
            <div className="gold-line mt-4 w-24" />
            <p className="mt-6 text-lg">
              ชมบ้านแบบ 360° ได้ทุกมุมจากที่ไหนก็ได้ ทั้งบนมือถือและคอมพิวเตอร์ ก่อนนัดชมโครงการจริง
            </p>
            <ul className="mt-6 space-y-2">
              <li>🏡 ทาวน์โฮม 2 ชั้น กว้าง 4 เมตร</li>
              <li>🛏️ 2 ห้องนอน · 2 ห้องน้ำ · 1 ที่จอดรถ</li>
              <li>📐 พื้นที่ใช้สอย 74 ตร.ม. · เนื้อที่ 16.5 ตร.วา</li>
              <li>📍 สุขสวัสดิ์-ประชาอุทิศ</li>
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-forest px-8 py-3 font-normal text-white hover:bg-slate-green"
            >
              นัดชมบ้านจริง
            </Link>
          </div>
          <div className="md:col-span-3">
            <VirtualTour
              url={TOUR_URL}
              title="Virtual Tour ภูมิใจ ไพร์ม 2 โครงการ 2"
              cover={`${IMG}/tour-cover-prime2-phase2.webp`}
              coverAlt="ห้องนั่งเล่นทาวน์โฮม ภูมิใจ ไพร์ม 2 โครงการ 2 มองเข้าไปถึงห้องทานอาหารและบันได"
            />
          </div>
        </div>
      </section>

      {/* จุดเด่น */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <p className="text-sm tracking-widest text-slate-green">WHY POOMJAI</p>
          <h2 className="mt-2 text-3xl md:text-4xl">ความมั่นใจในการมีบ้าน</h2>
          <div className="gold-line mx-auto mt-4 w-24" />
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-2xl bg-sage-light/60 p-6 text-center">
              <p className="text-4xl" aria-hidden>
                {r.icon}
              </p>
              <h3 className="mt-4 text-lg">{r.title}</h3>
              <p className="mt-2 text-sm text-forest/80">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ภายในบ้าน */}
      <section className="bg-forest px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm tracking-widest text-gold-light">Modern Minimal Living</p>
          <h2 className="mt-2 text-3xl md:text-4xl">บรรยากาศภายในบ้าน</h2>
          <div className="gold-line mt-4 w-24" />
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {interiors.map((img) => (
              <div key={img.src} className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ติดต่อ */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center md:py-24">
        <h2 className="text-3xl md:text-4xl">นัดชมบ้านจริงกับเรา</h2>
        <div className="gold-line mx-auto mt-4 w-24" />
        <p className="mx-auto mt-6 max-w-2xl text-lg">
          สำนักงานขาย สุขสวัสดิ์ (ภูมิใจ ไพร์ม / ไพร์ม 2) พร้อมให้คำปรึกษาเรื่องบ้านและสินเชื่อ
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={`tel:${c.phoneSukhumvit[0].replace(/-/g, "")}`}
            className="w-full rounded-full bg-forest px-8 py-3 font-normal text-white hover:bg-slate-green sm:w-auto"
          >
            📞 {c.phoneSukhumvit[0]}
          </a>
          <a
            href={c.lineUrl}
            target="_blank"
            rel="noopener"
            className="w-full rounded-full border border-forest px-8 py-3 font-normal hover:bg-sage-light sm:w-auto"
          >
            💬 LINE {c.line}
          </a>
        </div>
        <p className="mt-10 text-xs text-forest/70">
          *รายละเอียดเงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด บริษัทฯ ขอสงวนสิทธิ์ในการเปลี่ยนแปลงโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
        </p>
      </section>
    </>
  );
}

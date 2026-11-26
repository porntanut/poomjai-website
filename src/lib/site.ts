// ข้อมูลกลางของเว็บ — แก้ที่นี่ที่เดียว ใช้ทั้ง metadata, sitemap, robots

// ลิงก์เว็บ: ถ้าตั้ง NEXT_PUBLIC_SITE_URL ไว้ (ตอนมีโดเมนจริง) จะใช้ค่านั้น
// ถ้าไม่ตั้ง บน Vercel จะใช้ลิงก์ .vercel.app ของ production ให้อัตโนมัติ
// รันในเครื่อง = http://localhost:3000
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");

export const site = {
  name: "ภูมิใจนิเวศน์",
  nameEn: "Poomjai Nivate",
  tagline: "ขอเป็นส่วนหนึ่งในก้าวแรก แห่งความมั่นคง",
  description:
    "ภูมิใจนิเวศน์ ผู้พัฒนาบ้านคุณภาพ ทำเลดี ราคาคุ้มค่า ประสบการณ์กว่า 40 ปี สร้างมาแล้วกว่า 30 โครงการ มากกว่า 7,000 ยูนิต",
  logo: "/brand/poomjai-prime2-logo-dark.png",
  contact: {
    phoneHQ: "02-819-7977",
    phoneSukhumvit: ["090-898-4549", "086-340-8277"],
    phoneTheparak: "064-183-0478",
    email: "info@poomjainivate.com",
    line: "@poomjainivate",
    lineUrl: "https://lin.ee/eAWwDek",
    facebook: "https://www.facebook.com/poomjainivate/",
    instagram: "https://www.instagram.com/poomjainivate/",
    tiktok: "https://www.tiktok.com/@poomjainivate",
    address: "88/8 หมู่ 1 ต.แหลมฟ้าผ่า อ.พระสมุทรเจดีย์ จ.สมุทรปราการ 10290",
  },
};

// ทุกหน้าในเว็บ — เพิ่มหน้าใหม่ให้เพิ่มที่นี่ด้วย sitemap จะอัปเดตเอง
export const pages = [
  { path: "/", label: "หน้าแรก", priority: 1, changeFrequency: "weekly" },
  { path: "/projects", label: "โครงการ", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", label: "เกี่ยวกับเรา", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", label: "ติดต่อเรา", priority: 0.8, changeFrequency: "monthly" },
] as const;

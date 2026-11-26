
เว็บไซต์บริษัทภูมิใจนิเวศน์ · แบรนด์จาก ../../00-Context/02-Brand.md
- ข้อมูลกลาง/รายชื่อหน้า: src/lib/site.ts (เพิ่มหน้าใหม่ → เพิ่มใน `pages` แล้ว sitemap อัปเดตเอง)
- ทุกหน้าต้องมี `metadata` (title + description + canonical)
- ลิงก์เว็บ: ใช้ .vercel.app อัตโนมัติ · มีโดเมนแล้วตั้ง NEXT_PUBLIC_SITE_URL ใน Vercel
- robots.ts เปิดให้บอท AI ทุกตัว
- หน้าแรก: src/app/page.tsx · สไลด์ src/components/HeroSlider.tsx · Virtual Tour src/components/VirtualTour.tsx
- คำนวณผ่อนบ้าน: src/components/LoanCalculator.tsx · Q&A: src/lib/faq.ts (pending: true = ซ่อนจากเว็บ)
- รูป/วิดีโอหน้าแรก: public/images/home (webp) · public/videos
- GitHub: https://github.com/porntanut/poomjai-website (Private) · บันทึกงาน memo/NOTES.md · งานค้าง memo/TODO.md
- เว็บจริง: https://poomjai-website-8426.vercel.app
- SEO/AI: JSON-LD src/components/JsonLd.tsx (บริษัทใน layout.tsx · โครงการ src/lib/projects.ts) · สรุปให้ AI /llms.txt = src/app/llms.txt/route.ts

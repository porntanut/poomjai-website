# บันทึกงาน (ใหม่สุดอยู่บน)

## 2026-11-26 · พร้อมสำหรับ Google + AI (SEO/JSON-LD/llms.txt)
- ทำแล้ว: เช็กชื่อหน้า คำอธิบาย canonical sitemap robots (เปิดบอท AI) FAQ schema และ meta Search Console ครบทุกหน้าแล้ว
- ทำแล้ว: เพิ่ม JSON-LD ข้อมูลบริษัท+เว็บไซต์ทุกหน้า (src/app/layout.tsx) และรายการโครงการ (src/app/projects/page.tsx) ผ่าน src/components/JsonLd.tsx
- ทำแล้ว: ย้ายรายชื่อโครงการไป src/lib/projects.ts (ใช้ร่วมกันหลายที่)
- ทำแล้ว: เพิ่มหน้า /llms.txt (src/app/llms.txt/route.ts) สรุปเว็บเป็นข้อความล้วนให้ AI อ่าน
- ทำแล้ว: เว็บขึ้น Vercel แล้ว https://poomjai-website-8426.vercel.app · ยืนยัน Search Console แล้ว · ส่ง sitemap.xml แล้ว
- ตัดสินใจ: ไม่ใส่ที่อยู่โครงการละเอียดใน JSON-LD (ใส่แค่ทำเล) เพราะยังไม่มีข้อมูลยืนยัน
- ข้อควรระวัง: Search Console ขึ้น "ดึงข้อมูลไม่ได้" ตอนส่ง sitemap ครั้งแรก — เช็กแล้วเว็บเปิดได้ปกติ (200) เป็นอาการปกติของเว็บใหม่ รอ 1–2 วัน
- ข้อควรระวัง: เครื่องนี้ไม่มี Python ใช้ node แทนถ้าต้องรันสคริปต์

## 2026-11-26 · แบนเนอร์ + คำนวณผ่อนบ้าน + Q&A + Search Console
- ทำแล้ว: สไลด์แรกหน้าแรกเป็นแบนเนอร์ CoverPage (public/images/home/hero-cover-banner.webp) · HeroSlider รองรับสไลด์แบบ banner (แสดงเต็มภาพ ไม่มีข้อความทับ พื้นหลังเบลอ กดไป /projects)
- ทำแล้ว: ย้ายโปรแกรม loan-calculator มาเป็นหน้า /loan-calculator (src/components/LoanCalculator.tsx) + เมนู "คำนวณผ่อนบ้าน"
- ทำแล้ว: หน้า /faq (เมนู "Q&A") ข้อมูลอยู่ใน src/lib/faq.ts · ขึ้นเว็บ 12 ข้อ + FAQPage schema ให้ Google/AI อ่าน
- ทำแล้ว: ใส่รหัสยืนยัน Google Search Console ใน src/app/layout.tsx (verification.google)
- ทำแล้ว: push ขึ้น GitHub ครบทุกงาน (ยังไม่ขึ้นเว็บจริง เพราะยังไม่ต่อ Vercel)
- ตัดสินใจ: แบนเนอร์มีข้อความในรูปแล้ว → ไม่ใส่ข้อความเว็บทับ
- ตัดสินใจ: ย้ายตัวคำนวณเข้ามาในเว็บ แทนการลิงก์ออกไปเว็บ loan-calculator (แบรนด์เดียวกัน ดีต่อ SEO)
- ตัดสินใจ: Q&A ข้อที่ยังไม่มีข้อมูลจริงใส่ pending: true → ซ่อนจากเว็บ ไม่แต่งตัวเลขเอง
- ข้อควรระวัง: ไฟล์ภาพอยู่ที่ 01-Assets/photos/CoverPage.jpg (เป็นไฟล์ ไม่ใช่โฟลเดอร์)
- ข้อควรระวัง: Search Console จะกด Verify ผ่านได้ต่อเมื่อเว็บออนไลน์แล้ว และลิงก์ที่กรอกต้องตรงกับเว็บจริง

## 2026-11-26 · หน้าแรก + ขึ้น GitHub/Vercel
- ทำแล้ว: หน้าแรกใหม่ (src/app/page.tsx) มี slider รูป/วิดีโอ, การ์ดโครงการ 3 ใบ, Virtual Tour ภูมิใจ ไพร์ม 2 โครงการ 2 (realsee.ai/VbOOEOZA), จุดเด่น, รูปภายในบ้าน, ปุ่มโทร/LINE
- ทำแล้ว: คอมโพเนนต์ใหม่ HeroSlider.tsx, VirtualTour.tsx, MobileMenu.tsx (เมนู ☰ บนมือถือ) · Header ติดด้านบนตอนเลื่อน
- ทำแล้ว: ครอปรูปจาก 01-Assets เป็น webp (PC 16:9 / มือถือ 3:4) ไว้ที่ public/images/home · ย่อวิดีโอบ้านเดี่ยว 37MB → 1.8MB ที่ public/videos
- ทำแล้ว: push ขึ้น GitHub https://github.com/porntanut/poomjai-website (Private, branch main)
- ตัดสินใจ: ไม่มีไฟล์ 00-Context/01-Company.md → ใช้ 02-Brand.md + โบรชัวร์แทน (ผู้ใช้เลือก)
- ตัดสินใจ: scasset.com ใช้แค่โครงหน้า ไม่ใช้ข้อความ/รูป · ไม่ใช้รูปป้ายโฆษณาที่มีราคา (ราคายังไม่ยืนยัน)
- ตัดสินใจ: Virtual Tour แสดงภาพปกก่อน กดแล้วค่อยโหลด เพื่อให้หน้าเว็บเร็ว
- ข้อควรระวัง: พอร์ต 3000/3001 มีเว็บอื่นรันอยู่ เว็บนี้รันที่ http://localhost:3002
- ข้อควรระวัง: GitHub ปฏิเสธ push เพราะอีเมลส่วนตัว → ตั้ง git user.email ของโปรเจกต์นี้เป็นอีเมล noreply ของ GitHub แล้ว
- ข้อควรระวัง: เครื่องมือ Vercel สร้างโปรเจกต์ให้ไม่ได้ (403) และเครื่องไม่มี gh / vercel CLI → ต้อง import บนเว็บ Vercel เอง
- ข้อควรระวัง: เครื่องเป็น Windows ARM · ffmpeg ต้องติดตั้งแบบ x64 (npm_config_arch=x64 npm i ffmpeg-static)

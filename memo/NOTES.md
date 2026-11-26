# บันทึกงาน (ใหม่สุดอยู่บน)

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

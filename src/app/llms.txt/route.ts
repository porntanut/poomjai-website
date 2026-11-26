// /llms.txt — สรุปเว็บเป็นข้อความล้วน ให้ AI (ChatGPT, Claude, Perplexity ฯลฯ) อ่านง่าย
import { site, siteUrl, pages } from "@/lib/site";
import { projects } from "@/lib/projects";
import { publishedFaqGroups } from "@/lib/faq";

export function GET() {
  const c = site.contact;
  const lines = [
    `# ${site.name} (${site.nameEn})`,
    "",
    `> ${site.description}`,
    "",
    "## หน้าในเว็บ",
    ...pages.map((p) => `- [${p.label}](${siteUrl}${p.path === "/" ? "" : p.path})`),
    "",
    "## โครงการ",
    ...projects.map((p) => `- ${p.name}: ${p.detail}`),
    "",
    "## ติดต่อ",
    `- โทรสำนักงานใหญ่: ${c.phoneHQ}`,
    `- โทรโครงการสุขสวัสดิ์: ${c.phoneSukhumvit.join(", ")}`,
    `- โทรโครงการเทพารักษ์: ${c.phoneTheparak}`,
    `- อีเมล: ${c.email}`,
    `- LINE: ${c.line} (${c.lineUrl})`,
    `- ที่อยู่: ${c.address}`,
    "",
    "## คำถามที่พบบ่อย",
    ...publishedFaqGroups.flatMap((g) => g.items.map((f) => `### ${f.q}\n${f.a}\n`)),
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

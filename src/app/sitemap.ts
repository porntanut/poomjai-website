import type { MetadataRoute } from "next";
import { pages, siteUrl } from "@/lib/site";

// วันที่แก้เนื้อหาล่าสุด — อัปเดตเมื่อแก้เนื้อหาเว็บ
const lastModified = new Date("2026-11-26");

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${siteUrl}${p.path === "/" ? "" : p.path}`,
    lastModified,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}

"use client";

import Image from "next/image";
import { useState } from "react";

// แสดงภาพปกก่อน กดแล้วค่อยโหลด Virtual Tour (ช่วยให้หน้าเว็บโหลดเร็ว โดยเฉพาะบนมือถือ)
export default function VirtualTour({
  url,
  title,
  cover,
  coverAlt,
}: {
  url: string;
  title: string;
  cover: string;
  coverAlt: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-forest shadow-xl ring-1 ring-gold-light/40 md:aspect-[16/10]">
        {open ? (
          <iframe
            src={url}
            title={title}
            className="absolute inset-0 h-full w-full border-0"
            allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`เริ่ม ${title}`}
          >
            <Image
              src={cover}
              alt={coverAlt}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-forest/40" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
              <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold-light bg-forest/70 text-sm font-normal tracking-widest backdrop-blur transition group-hover:bg-forest">
                360°
              </span>
              <span className="rounded-full bg-white px-6 py-2 font-normal text-forest">
                เริ่มชม Virtual Tour
              </span>
            </span>
          </button>
        )}
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        className="mt-3 inline-block text-sm underline underline-offset-4 hover:text-slate-green"
      >
        เปิด Virtual Tour แบบเต็มจอ ↗
      </a>
    </div>
  );
}

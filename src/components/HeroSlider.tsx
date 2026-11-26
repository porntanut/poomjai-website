"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

// ผู้ใช้ที่ตั้งค่า "ลดการเคลื่อนไหว" ในเครื่อง → ไม่เลื่อนสไลด์/ไม่เล่นวิดีโอเอง
const RM_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReducedMotion = () => window.matchMedia(RM_QUERY).matches;

// สไลด์ด้านบนของหน้าแรก — รูปแยก 2 ขนาด (PC 16:9 · มือถือ 3:4) และวิดีโอแนวตั้ง
export type HeroSlide =
  | {
      type: "image";
      desktop: string;
      mobile: string;
      alt: string;
      eyebrow: string;
      title: string;
      text: string;
      cta: { label: string; href: string };
    }
  | {
      // ภาพแบนเนอร์ที่มีข้อความในรูปอยู่แล้ว → แสดงเต็มภาพ ไม่ทับข้อความ
      type: "banner";
      src: string;
      blur: string;
      width: number;
      height: number;
      alt: string;
      href?: string;
    }
  | {
      type: "video";
      src: string;
      poster: string;
      alt: string;
      eyebrow: string;
      title: string;
      text: string;
      cta: { label: string; href: string };
    };

const IMAGE_DURATION = 6000;

function SlideImage({ slide, priority }: { slide: Extract<HeroSlide, { type: "image" }>; priority: boolean }) {
  const common = { alt: slide.alt, sizes: "100vw", priority, quality: 80 };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: slide.desktop, width: 1600, height: 900 });
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, src: slide.mobile, width: 750, height: 1000 });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
      <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...rest} className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  );
}

function SlideBanner({
  slide,
  priority,
  active,
}: {
  slide: Extract<HeroSlide, { type: "banner" }>;
  priority: boolean;
  active: boolean;
}) {
  const { props } = getImageProps({
    src: slide.src,
    alt: slide.alt,
    width: slide.width,
    height: slide.height,
    sizes: "100vw",
    priority,
    quality: 82,
  });
  const img = (
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    <img {...props} className="relative h-full w-full object-contain" />
  );
  return (
    <>
      {/* พื้นหลังเบลอจากภาพเดียวกัน เติมส่วนที่ว่างรอบแบนเนอร์ */}
      <div
        aria-hidden
        className="absolute inset-0 scale-110 bg-cover bg-center blur-2xl"
        style={{ backgroundImage: `url(${slide.blur})` }}
      />
      <div className="absolute inset-0 flex items-center justify-center pb-12 md:pb-14">
        {slide.href ? (
          <Link href={slide.href} tabIndex={active ? 0 : -1} className="block h-full w-full">
            {img}
          </Link>
        ) : (
          img
        )}
      </div>
    </>
  );
}

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // เล่นวิดีโอเฉพาะสไลด์ที่แสดงอยู่ · สไลด์รูปเลื่อนเองทุก 6 วินาที
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === index && !reduceMotion) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    if (slides[index].type === "video" || paused || reduceMotion) return;
    const t = setTimeout(next, IMAGE_DURATION);
    return () => clearTimeout(t);
  }, [index, paused, reduceMotion, next, slides]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ภาพไฮไลต์โครงการ"
      className="relative h-[78svh] min-h-[480px] w-full overflow-hidden bg-forest text-white md:h-auto md:aspect-[16/9] md:max-h-[calc(100svh-82px)] md:min-h-[520px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} จาก ${count}`}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-700 ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            {s.type === "banner" ? (
              <SlideBanner slide={s} priority={i === 0} active={active} />
            ) : s.type === "image" ? (
              <SlideImage slide={s} priority={i === 0} />
            ) : (
              <>
                {/* พื้นหลังเบลอสำหรับจอกว้าง เพราะวิดีโอเป็นแนวตั้ง */}
                <div
                  aria-hidden
                  className="absolute inset-0 hidden scale-110 bg-cover bg-center opacity-50 blur-2xl md:block"
                  style={{ backgroundImage: `url(${s.poster})` }}
                />
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  src={s.src}
                  poster={s.poster}
                  muted={muted}
                  playsInline
                  preload={i === 0 ? "auto" : "metadata"}
                  aria-label={s.alt}
                  onEnded={next}
                  className="absolute inset-0 h-full w-full object-cover md:inset-auto md:right-[8%] md:top-1/2 md:h-[86%] md:w-auto md:-translate-y-1/2 md:rounded-2xl md:object-contain md:shadow-2xl md:ring-1 md:ring-gold-light/40"
                />
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className="absolute right-4 top-4 z-20 rounded-full bg-forest/70 px-4 py-2 text-sm backdrop-blur hover:bg-forest md:right-[8%] md:top-[10%] md:mr-3"
                  aria-pressed={!muted}
                >
                  {muted ? "🔇 เปิดเสียง" : "🔊 ปิดเสียง"}
                </button>
              </>
            )}

            {/* ข้อความบนสไลด์ (แบนเนอร์มีข้อความในรูปแล้ว ไม่ต้องใส่) */}
            {s.type !== "banner" && (
            <>
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent md:bg-gradient-to-r md:from-forest/90 md:via-forest/50 md:to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 mx-auto max-w-6xl px-6 pb-20 [text-shadow:0_2px_12px_rgba(19,46,42,0.6)] md:inset-y-0 md:flex md:flex-col md:justify-center md:pb-0">
              <div className="max-w-xl">
                <p className="text-xs tracking-[0.2em] text-gold-light md:text-sm">{s.eyebrow}</p>
                <h2 className="mt-2 text-3xl leading-tight md:text-5xl">{s.title}</h2>
                <div className="gold-line mt-4 w-20" />
                <p className="mt-4 text-base text-white/90 md:text-lg">{s.text}</p>
                <Link
                  href={s.cta.href}
                  tabIndex={active ? 0 : -1}
                  className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-normal text-forest hover:bg-gold-light"
                >
                  {s.cta.label}
                </Link>
              </div>
            </div>
            </>
            )}
          </div>
        );
      })}

      {/* ปุ่มก่อนหน้า/ถัดไป (ซ่อนบนมือถือ ใช้ปัดแทน) */}
      <button
        type="button"
        onClick={prev}
        aria-label="สไลด์ก่อนหน้า"
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-forest/40 text-2xl backdrop-blur hover:bg-forest md:flex"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="สไลด์ถัดไป"
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-forest/40 text-2xl backdrop-blur hover:bg-forest md:flex"
      >
        ›
      </button>

      {/* จุดบอกตำแหน่ง */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => go(i)}
            aria-label={`ไปสไลด์ที่ ${i + 1}`}
            aria-current={i === index}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-gold-light" : "w-2.5 bg-white/60 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
}

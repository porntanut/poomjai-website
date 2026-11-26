import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

// ข้อมูลบริษัท + เว็บไซต์ ให้ Google และ AI รู้ว่าเว็บนี้คือใคร ติดต่อยังไง
const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": `${siteUrl}/#organization`,
      name: site.name,
      alternateName: site.nameEn,
      url: siteUrl,
      logo: `${siteUrl}${site.logo}`,
      image: `${siteUrl}${site.logo}`,
      description: site.description,
      slogan: site.tagline,
      telephone: site.contact.phoneHQ,
      email: site.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "88/8 หมู่ 1 ต.แหลมฟ้าผ่า",
        addressLocality: "อ.พระสมุทรเจดีย์",
        addressRegion: "สมุทรปราการ",
        postalCode: "10290",
        addressCountry: "TH",
      },
      sameAs: [site.contact.facebook, site.contact.instagram, site.contact.tiktok, site.contact.lineUrl],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      inLanguage: "th-TH",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | บ้านคุณภาพ ทำเลดี ราคาคุ้มค่า`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: site.name,
    images: [{ url: site.logo, width: 4267, height: 1367, alt: site.name }],
  },
  robots: { index: true, follow: true },
  // ยืนยันความเป็นเจ้าของเว็บกับ Google Search Console
  verification: { google: "1GeBHNvKVO41zEHbQzdcpCPcGilsqDYTcROOXi0WwJY" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${kanit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={orgJsonLd} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

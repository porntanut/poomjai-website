import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${kanit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

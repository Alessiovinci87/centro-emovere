// app/layout.js
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import site from "@/content/site.config.json";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import Header from "@/components/Header.client";
import Footer from "@/components/Footer";
import TabBar from "@/components/TabBar.client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

const DESCRIPTION =
  "Centro Emovere è un centro multidisciplinare ad Alghero: psicologia, logopedia, neuropsicomotricità, fisioterapia ed educazione professionale per bambini, ragazzi e adulti.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.brand} — Terapia, Riabilitazione e Crescita ad Alghero`,
    template: `%s — ${site.brand}`,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.brand,
    title: `${site.brand} — Terapia, Riabilitazione e Crescita ad Alghero`,
    description: DESCRIPTION,
    images: [{ url: "/img/hero.jpg", width: 2560, height: 1440, alt: site.brand }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Emovere" },
  formatDetection: { telephone: true },
};

export const viewport = {
  themeColor: "#f7f4ee",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: site.brand,
    description: DESCRIPTION,
    url: SITE_URL,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    image: absoluteUrl("/img/logo-centro-emovere-alghero.jpg"),
    logo: absoluteUrl("/img/logo-centro-emovere-alghero.jpg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.addressStreet,
      addressLocality: site.addressCity,
      addressRegion: site.addressProvince,
      postalCode: site.addressZip,
      addressCountry: "IT",
    },
    sameAs: [site.instagram].filter(Boolean),
    medicalSpecialty: (site.services || []).map((s) => s.title),
  };

  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Vai al contenuto
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <TabBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}

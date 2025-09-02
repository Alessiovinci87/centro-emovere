// app/layout.js
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import site from "@/content/site.config.json";
import BackgroundPattern from "@/components/BackgroundPattern";
import Header from "@/components/Header.client";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata = {
  title: site.brand,
  description: site.tagline,
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--fg)] antialiased">
        {/* Navbar responsive (mobile/tablet: hamburger+brand centrato+IG; desktop: brand SX, menu centro, IG DX) */}
        <Header />

        {/* Main */}
        <main>{children}</main>

        <footer
          className="mt-16 relative overflow-hidden shadow-[0_-6px_16px_rgba(0,0,0,0.08)]"
          style={{ background: "#f7f2e7" }}
        >
          <BackgroundPattern variant="band" />

          <div className="container-wide py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:[grid-template-columns:1fr_1fr_1.3fr_1fr] items-start relative z-10">
            {/* Brand */}
            <div className="space-y-1">
              <div className="font-serif text-base">{site.brand}</div>
              <div className="text-[var(--muted)]">{site.tagline}</div>
            </div>

            {/* Indirizzo */}
            <div className="space-y-1">
              <div className="text-[var(--muted)]">Indirizzo</div>
              <div>{site.address}</div>
            </div>

            {/* Contatti */}
            <div className="space-y-2">
              <div className="text-[var(--muted)]">Contatti</div>
              <a
                href={`mailto:${site.email}`}
                className="link-quiet whitespace-normal lg:whitespace-nowrap"
              >
                {site.email}
              </a>

              <div>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-block"
                >
                  <img
                    src="/img/ig.png"
                    alt="Instagram"
                    className="w-10 h-10 md:w-12 md:h-12 hover:scale-110 transition"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>

            {/* Mappa */}
            <div className="space-y-2">
              <div className="text-[var(--muted)]">Dove siamo</div>
              <a
                href="https://www.google.com/maps?q=Centro+Emovere+Alghero"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/img/maps.png"
                  alt="Mappa Centro Emovere"
                  className="w-full max-w-[220px] md:max-w-[260px] rounded shadow hover:opacity-90 transition object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </a>
            </div>
          </div>

          <div className="border-t border-[var(--border)] relative z-10">
            <div className="container py-4 text-xs text-[var(--muted)] text-center md:text-left">
              © {new Date().getFullYear()} {site.brand}. Tutti i diritti riservati.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}

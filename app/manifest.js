import site from "@/content/site.config.json";

export default function manifest() {
  return {
    name: `${site.brand} — Alghero`,
    short_name: "Emovere",
    description: "Centro multidisciplinare ad Alghero: psicologia, logopedia, neuropsicomotricità, fisioterapia ed educazione professionale.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4ee",
    theme_color: "#f7f4ee",
    lang: "it",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

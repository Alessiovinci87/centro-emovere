const path = require("path");

const isProd = process.env.NODE_ENV === "production";

/**
 * Header di sicurezza.
 * La CSP consente solo risorse del sito stesso, più la mappa Google (caricata su click), l'API di Web3Forms per il form contatti
 * e le immagini statiche di Google Maps. In sviluppo Next ha bisogno di eval per l'HMR.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com https://*.googleusercontent.com",
  "font-src 'self' data:",
  "connect-src 'self' https://api.web3forms.com",
  "frame-src https://www.google.com https://maps.google.com",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isProd ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Evita che Next scelga la cartella home come root (ci sono più lockfile sul PC)
  outputFileTracingRoot: path.join(__dirname),
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;

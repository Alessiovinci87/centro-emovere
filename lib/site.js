// lib/site.js — helper condivisi per leggere content/site.config.json
import site from "@/content/site.config.json";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.siteUrl || "http://localhost:3000").replace(/\/$/, "");

export const services = Array.isArray(site.services) ? site.services : [];
export const team = Array.isArray(site.team) ? site.team : [];

export function getService(slug) {
  return services.find((s) => s.slug === slug) || null;
}

export function getMember(slug) {
  return team.find((m) => m.slug === slug) || null;
}

/** Operatori collegati a un servizio (supporta serviceSlug singolo e serviceSlugs[]). */
export function membersForService(slug) {
  return team.filter((m) => {
    const list = Array.isArray(m.serviceSlugs) ? m.serviceSlugs : [];
    return list.includes(slug) || m.serviceSlug === slug;
  });
}

/** Servizi collegati a un operatore. */
export function servicesForMember(member) {
  if (!member) return [];
  const list = Array.isArray(member.serviceSlugs) ? member.serviceSlugs : member.serviceSlug ? [member.serviceSlug] : [];
  return list.map(getService).filter(Boolean);
}

/** Normalizza un'immagine che può essere stringa o { src, alt }. */
export function img(value, { fallback = "/img/hero.jpg", alt = "" } = {}) {
  if (!value) return { src: fallback, alt };
  if (typeof value === "string") return { src: value, alt };
  return { src: value.src || fallback, alt: value.alt || alt };
}

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function cleanTel(t) {
  return t ? String(t).replace(/[^+\d]/g, "") : "";
}

export default site;

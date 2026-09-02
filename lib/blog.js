// lib/blog.js — articoli del blog letti da content/blog/*.json
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content", "blog");

export function getPosts() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
    .filter((p) => p && p.slug && p.title && !p.draft)
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

export function getPost(slug) {
  return getPosts().find((p) => p.slug === slug) || null;
}

export function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

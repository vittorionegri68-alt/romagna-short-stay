// ─────────────────────────────────────────────────────────────────────────────
// generate-sitemap.mjs
//
// Genera automaticamente public/sitemap.xml a partire da src/posts.jsx ad ogni
// build, cosi la sitemap resta sempre sincronizzata con gli articoli pubblicati.
//
// Perche esiste: audit AI'm by VNS del 19/11/2026 ha rilevato che la sitemap
// era statica e conteneva solo la homepage, nessuno dei 10+ articoli del blog.
// Risultato: Google, Bing e Brave non avevano modo di scoprire gli articoli
// tramite sitemap (oltre al problema, gia corretto, della raggiungibilita dei
// link in home). Segue lo stesso pattern gia in uso in generate-blog-pages.mjs
// e generate-blog-noscript.mjs: legge posts.jsx come modulo ES puro tramite
// una copia temporanea .mjs.
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync, copyFileSync, unlinkSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const POSTS_PATH = join(ROOT, "src", "posts.jsx");
const SITEMAP_PATH = join(ROOT, "public", "sitemap.xml");

const SITE_URL = "https://www.romagna-short-stay.com";
const ALT_SITE_URL = "https://www.romagna-affitti-brevi.it";
const LANG = "en";
const ALT_LANG = "it";

// Stessa normalizzazione di generate-blog-pages.mjs e generate-blog-noscript.mjs:
// gli slug devono coincidere con i nomi file reali in public/post/.
function slugify(id) {
  return String(id)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function loadPosts() {
  const tmpPath = join(ROOT, "src", `_posts-tmp-${Date.now()}.mjs`);
  copyFileSync(POSTS_PATH, tmpPath);
  try {
    const mod = await import(pathToFileURL(tmpPath).href);
    return mod.posts;
  } finally {
    unlinkSync(tmpPath);
  }
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function renderUrl(loc, lastmod, alternates) {
  const alt = (alternates || [])
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
    .join("\n");
  return [`  <url>`, `    <loc>${loc}</loc>`, `    <lastmod>${lastmod}</lastmod>`, alt, `  </url>`]
    .filter(Boolean)
    .join("\n");
}

// Pagina statica indicizzabile servita da public/: va in sitemap come la home.
const STATIC_PAGE = "/about.html";
const ALT_STATIC_PAGE = "/chi-siamo.html";

async function main() {
  const posts = await loadPosts();
  const visibili = posts.filter((p) => p.attivo);

  const entries = [
    renderUrl(`${SITE_URL}/`, todayISO(), [
      { lang: LANG, href: `${SITE_URL}/` },
      { lang: ALT_LANG, href: `${ALT_SITE_URL}/` },
      { lang: "x-default", href: `${ALT_SITE_URL}/` },
    ]),
    renderUrl(`${SITE_URL}${STATIC_PAGE}`, todayISO(), [
      { lang: LANG, href: `${SITE_URL}${STATIC_PAGE}` },
      { lang: ALT_LANG, href: `${ALT_SITE_URL}${ALT_STATIC_PAGE}` },
      { lang: "x-default", href: `${SITE_URL}${STATIC_PAGE}` },
    ]),
    ...visibili.map((p) => renderUrl(`${SITE_URL}/post/${slugify(p.id)}.html`, p.data)),
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
    `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    entries.join("\n"),
    `</urlset>`,
    ``,
  ].join("\n");

  writeFileSync(SITEMAP_PATH, xml, "utf8");
  console.log(
    `generate-sitemap: scritti ${entries.length} URL in public/sitemap.xml (1 homepage + 1 pagina statica + ${visibili.length} articoli)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { MetadataRoute } from "next";
import path from "path";
import { promises as fs } from "fs";

const SITE = "https://universaljournalnews.uz";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: new Date() },
    { url: `${SITE}/editorial-board`, lastModified: new Date() },
    { url: `${SITE}/articles`, lastModified: new Date() },
  ];

  const pdfDir = path.join(process.cwd(), "public", "pdfs");

  try {
    const files = await fs.readdir(pdfDir);
    const slugs = files
      .filter((f) => f.toLowerCase().endsWith(".pdf"))
      .map((f) => f.replace(/\.pdf$/i, ""));

    for (const slug of slugs) {
      urls.push({ url: `${SITE}/pdf/${slug}`, lastModified: new Date() });
      urls.push({ url: `${SITE}/articles/${slug}`, lastModified: new Date() });
    }
  } catch {}

  return urls;
}
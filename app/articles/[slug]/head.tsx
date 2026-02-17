import articles from "@/data/articles.json";
import { siteConfig } from "@/lib/site";

type Params = { slug: string };

function findArticle(slug: string) {
  // @ts-ignore
  return (articles as any[]).find((a) => a.slug === slug || a.id === slug);
}

function normalizeAuthors(a: any): string[] {
  if (!a) return [];
  if (Array.isArray(a.authors)) return a.authors.filter(Boolean).map(String);
  if (typeof a.authors === "string" && a.authors.trim()) return a.authors.split(",").map(s => s.trim()).filter(Boolean);
  return [];
}

function resolvePdfPath(a: any): string {
  if (!a) return "";
  // 1) direct pdf path: "/pdf/article-1.pdf"
  if (typeof a.pdf === "string" && a.pdf.trim()) return a.pdf.trim();
  // 2) full url
  if (typeof a.pdfUrl === "string" && a.pdfUrl.trim()) return a.pdfUrl.trim();
  // 3) slug-based: "article-1" -> "/pdf/article-1.pdf"
  if (typeof a.pdfSlug === "string" && a.pdfSlug.trim()) return `/pdf/${a.pdfSlug.trim()}.pdf`;
  return "";
}

export default function Head({ params }: { params: Params }) {
  const a = findArticle(params.slug);

  const journalTitle = "Universal Journal News";
  const issn = "1234-5678";

  const title = String(a?.title ?? params.slug);
  const pubDate = String(a?.publishedDate ?? "2026-01-15");
  const volume = String(a?.volume ?? 1);
  const issue = String(a?.issue ?? 1);

  const authors = normalizeAuthors(a);

  const pdfPath = resolvePdfPath(a);
  const pdfUrl =
    pdfPath
      ? (pdfPath.startsWith("http") ? pdfPath : new URL(pdfPath, siteConfig.url).toString())
      : "";

  return (
    <>
      <title>{`${title} | ${journalTitle}`}</title>

      <meta name="citation_title" content={title} />
      <meta name="citation_journal_title" content={journalTitle} />
      <meta name="citation_issn" content={issn} />
      <meta name="citation_volume" content={volume} />
      <meta name="citation_issue" content={issue} />
      <meta name="citation_publication_date" content={pubDate} />

      {pdfUrl ? <meta name="citation_pdf_url" content={pdfUrl} /> : null}

      {authors.map((name) => (
        <meta key={name} name="citation_author" content={name} />
      ))}
    </>
  );
}

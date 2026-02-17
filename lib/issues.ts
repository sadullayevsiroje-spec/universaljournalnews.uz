// lib/issues.ts
import articles from "@/data/articles.json";

export type Article = {
  slug: string;
  title: string;
  authors: string[] | string;
  pages?: number;
  published?: string; // ISO: YYYY-MM-DD
  publishedAt?: string; // JSON'da publishedAt bor
  pdfSlug?: string;   // PDF uchun alohida slug
  issue?: {
    year: number;
    volume: number;
    number: number;
  };
};

function normalizeAuthors(a: string[] | string | undefined) {
  if (!a) return "";
  return Array.isArray(a) ? a.join(", ") : a;
}

function issueKey(issue?: Article["issue"]) {
  if (!issue) return "";
  return `${issue.year}-V${String(issue.volume).padStart(2, "0")}-N${String(
    issue.number
  ).padStart(2, "0")}`;
}

function issueLabel(issue?: Article["issue"]) {
  if (!issue) return "Current Issue";
  const vol = String(issue.volume).padStart(2, "0");
  const num = String(issue.number).padStart(2, "0");
  return `Vol. ${issue.volume} No. ${issue.number} (${issue.year}): Volume ${vol} Issue ${num}`;
}

function safeDate(d?: string) {
  // "2026-02-01" -> "2026-02-01"
  // yo'q bo'lsa null
  if (!d) return null;
  const x = new Date(d);
  return Number.isNaN(x.getTime()) ? null : d;
}

export function getAllArticles(): Article[] {
  return (articles as Article[]).slice();
}

export function getCurrentIssue() {
  const all = getAllArticles().filter((a) => a.issue);

  if (all.length === 0) {
    // issue yo'q bo'lsa ham sahifa ishlasin
    return {
      key: "no-issue",
      label: "Current Issue",
      published: null as string | null,
      articles: [] as Array<{
        title: string;
        authors: string;
        pages?: string;
        articleHref: string;
        pdfHref?: string;
      }>,
    };
  }

  // ENG YANGI issue ni topamiz: year > volume > number
  const sortedByIssue = all.sort((a, b) => {
    const ia = a.issue!;
    const ib = b.issue!;
    if (ia.year !== ib.year) return ib.year - ia.year;
    if (ia.volume !== ib.volume) return ib.volume - ia.volume;
    return ib.number - ia.number;
  });

  const latestIssue = sortedByIssue[0].issue!;
  const key = issueKey(latestIssue);

  const issueArticles = all
    .filter((a) => issueKey(a.issue) === key)
    // published bo'yicha (ixtiyoriy) tartiblash
    .sort((a, b) => {
      const da = safeDate(a.published);
      const db = safeDate(b.published);
      if (da && db) return db.localeCompare(da);
      return 0;
    })
    .map((a) => ({
      title: a.title,
      authors: normalizeAuthors(a.authors),
      pages: a.pages ? String(a.pages) : undefined,
      articleHref: `/articles/${a.slug}`,
      pdfHref: a.pdfSlug ? `/pdf/${a.pdfSlug}.pdf` : undefined,
    }));

  // issue published sanasi: shu issue dagi eng yangi published ni olamiz
  const published =
    issueArticles.length > 0
      ? safeDate(
          all
            .filter((a) => issueKey(a.issue) === key)
            .map((x) => x.published)
            .filter(Boolean)
            .sort()
            .at(-1)
        )
      : null;

  return {
    key,
    label: issueLabel(latestIssue),
    published,
    articles: issueArticles,
  };
}

// Keyinchalik Archives uchun:
export function getIssueArchives() {
  const all = getAllArticles().filter((a) => a.issue);

  const groups = new Map<
    string,
    { label: string; year: number; volume: number; number: number; articles: Article[] }
  >();

  for (const a of all) {
    const k = issueKey(a.issue);
    if (!k) continue;
    if (!groups.has(k)) {
      groups.set(k, {
        label: issueLabel(a.issue),
        year: a.issue!.year,
        volume: a.issue!.volume,
        number: a.issue!.number,
        articles: [],
      });
    }
    groups.get(k)!.articles.push(a);
  }

  return Array.from(groups.entries())
    .map(([key, g]) => ({
      key,
      label: g.label,
      year: g.year,
      volume: g.volume,
      number: g.number,
      count: g.articles.length,
    }))
    .sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      if (a.volume !== b.volume) return b.volume - a.volume;
      return b.number - a.number;
    });
}
export function getIssueArticles(year: number, volume: number, number: number) {
  const all = getAllArticles();

  const filtered = all.filter(
    (a) =>
      a.issue?.year === year &&
      a.issue?.volume === volume &&
      a.issue?.number === number
  );

  // Published bo'yicha tartib (ixtiyoriy)
  filtered.sort((a, b) => {
    const da = a.published ? new Date(a.published).getTime() : 0;
    const db = b.published ? new Date(b.published).getTime() : 0;
    return db - da;
  });

  return filtered.map((a) => ({
    title: a.title,
    authors: Array.isArray(a.authors) ? a.authors.join(", ") : a.authors,
    pages: a.pages ? String(a.pages) : undefined,
    articleHref: `/articles/${a.slug}`,
    pdfHref: a.pdfSlug ? `/pdf/${a.pdfSlug}.pdf` : undefined,
    published: a.published ?? null,
  }));
}

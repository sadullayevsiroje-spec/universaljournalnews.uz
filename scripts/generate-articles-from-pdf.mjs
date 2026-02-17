import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

function clean(s) {
  return (s || "")
    .replace(/\r/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function looksLikeParagraphStart(line) {
  const l = (line || "").trim();
  if (!l) return false;
  if (l.length < 18) return false;
  return /^(The|This|In|According|Recent|Conclusion|Background|Introduction)\b/.test(l);
}

function extractAbstractAndKeywords(text) {
  const t = clean(text);

  const abstractMatch =
    t.match(/(?:^|\n)\s*Abstract\s*:\s*([\s\S]*?)(?=\n\s*(?:Key\s*words?|Keywords?)\s*[:\-—]|(?:\n\s*\d+\.\s*Introduction\b)|\n\s*Introduction\b|\n\s*Background\b|$)/i) ||
    t.match(/(?:^|\n)\s*ABSTRACT\s*\n+([\s\S]*?)(?=\n\s*(?:Key\s*words?|Keywords?)\s*[:\-—]|(?:\n\s*\d+\.\s*INTRODUCTION\b)|\n\s*INTRODUCTION\b|\n\s*BACKGROUND\b|$)/);

  const abstract = abstractMatch ? clean(abstractMatch[1]) : "";

  const kwLineMatch = t.match(/(?:^|\n)\s*(?:Key\s*words?|Keywords?)\s*[:\-—]\s*([^\n]*)(?:\n|$)/i);
  if (!kwLineMatch) return { abstract, keywords: [] };

  const firstLine = (kwLineMatch[1] || "").trim();
  const idx = kwLineMatch.index ?? 0;
  const rest = t.slice(idx);

  const restLines = rest
    .replace(/^\s*(?:Key\s*words?|Keywords?)\s*[:\-—]\s*[^\n]*\n?/i, "")
    .split("\n");

  const secondLine = (restLines[0] || "").trim();

  let kwCombined = firstLine;
  if (secondLine && !looksLikeParagraphStart(secondLine)) {
    kwCombined = (kwCombined + " " + secondLine).trim();
  }

  kwCombined = kwCombined.replace(/\.$/, "");

  const keywords = kwCombined
    ? kwCombined
        .split(/[,;•·]+/g)
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

  return { abstract, keywords };
}

function guessTitle(text) {
  const lines = clean(text).split("\n").map((x) => x.trim()).filter(Boolean);

  // Abstract/Keywords/affiliation kabi satrlarni title deb olmaslik
  for (const l of lines.slice(0, 40)) {
    if (/^(abstract|keywords?|key\s*words?)\b/i.test(l)) continue;
    if (/^urgench|tashkent|institute|university|department/i.test(l)) continue;
    if (l.length < 12) continue;
    if (l.length > 180) continue;
    return l;
  }
  return "";
}

function makeSlugFromPdf(pdfSlug) {
  // article-1 -> Article-1 (sizning routing namingizga mos)
  // xohlasangiz buni o'zgartiramiz
  const parts = pdfSlug.split(/[-_ ]+/g).filter(Boolean);
  if (!parts.length) return pdfSlug;
  // "article" bo'lsa kapital qilib, raqamlarni saqlaymiz
  if (parts[0].toLowerCase() === "article" && parts[1]) {
    return `Article-${parts[1]}`;
  }
  // Default: TitleCase kabi
  return parts.map(p => p ? (p[0].toUpperCase() + p.slice(1)) : p).join("-");
}

async function main() {
  const pdfDir = path.resolve("./public/pdf");
  const outPath = path.resolve("./data/articles.json");

  const files = fs.readdirSync(pdfDir).filter((f) => f.toLowerCase().endsWith(".pdf"));

  if (!files.length) {
    console.error("No PDFs found in ./public/pdf");
    process.exit(1);
  }

  const articles = [];

  for (const file of files) {
    const pdfSlug = file.replace(/\.pdf$/i, "");
    const pdfPath = path.join(pdfDir, file);

    const buf = fs.readFileSync(pdfPath);
    const r = await pdfParse(buf);
    const text = clean(r.text || "");

    const title = guessTitle(text);
    const { abstract, keywords } = extractAbstractAndKeywords(text);

    articles.push({
      slug: makeSlugFromPdf(pdfSlug),
      title: title || pdfSlug,
      authors: [],
      affiliation: "",
      abstract: abstract || "",
      keywords: keywords || [],
      pdfSlug,
      publishedAt: "",
      pages: r.numpages || null,
    });
  }

  // barqaror tartib (pdfSlug bo'yicha)
  articles.sort((a, b) => String(a.pdfSlug).localeCompare(String(b.pdfSlug)));

  fs.writeFileSync(outPath, JSON.stringify(articles, null, 2), "utf8");
  console.log("DONE. Generated articles:", articles.length);
}

main().catch((e) => {
  console.error("GEN_ERROR:", e);
  process.exit(1);
});

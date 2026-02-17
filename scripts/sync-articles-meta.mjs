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

async function main() {
  const articlesPath = path.resolve("./data/articles.json");
  const pdfDir = path.resolve("./public/pdf");

  const articles = JSON.parse(fs.readFileSync(articlesPath, "utf8"));

  let updatedArticles = 0;
  let updatedFields = 0;

  const missingPdfSlug = [];
  const missingPdfFiles = [];
  const parsedButEmpty = [];
  const updatedList = [];

  for (const a of articles) {
    if (!a) continue;

    if (!a.pdfSlug) {
      missingPdfSlug.push(a.slug || a.title || "(unknown)");
      continue;
    }

    const pdfPath = path.join(pdfDir, `${a.pdfSlug}.pdf`);
    if (!fs.existsSync(pdfPath)) {
      missingPdfFiles.push({ article: a.slug || a.title || "(unknown)", pdf: `${a.pdfSlug}.pdf` });
      continue;
    }

    const buf = fs.readFileSync(pdfPath);
    const r = await pdfParse(buf);
    const text = clean(r.text || "");

    const { abstract, keywords } = extractAbstractAndKeywords(text);

    let changed = false;

    if (abstract && abstract !== a.abstract) {
      a.abstract = abstract;
      updatedFields++;
      changed = true;
    }

    if (keywords.length && JSON.stringify(keywords) !== JSON.stringify(a.keywords || [])) {
      a.keywords = keywords;
      updatedFields++;
      changed = true;
    }

    if (!abstract && !keywords.length) {
      parsedButEmpty.push(a.slug || a.title || a.pdfSlug);
    }

    if (changed) {
      updatedArticles++;
      updatedList.push(a.slug || a.title || a.pdfSlug);
    }
  }

  fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), "utf8");

  console.log("DONE");
  console.log("Updated articles:", updatedArticles);
  console.log("Updated fields:", updatedFields);

  if (updatedList.length) {
    console.log("\nUPDATED:");
    updatedList.forEach((x) => console.log("-", x));
  }

  if (missingPdfSlug.length) {
    console.log("\nMISSING pdfSlug (add pdfSlug to these):");
    missingPdfSlug.forEach((x) => console.log("-", x));
  }

  if (missingPdfFiles.length) {
    console.log("\nMISSING PDF FILES (public/pdf not found):");
    missingPdfFiles.forEach((m) => console.log("-", m.article, "=>", m.pdf));
  }

  if (parsedButEmpty.length) {
    console.log("\nPARSED BUT EMPTY (no abstract/keywords found):");
    parsedButEmpty.forEach((x) => console.log("-", x));
  }
}

main().catch((e) => {
  console.error("SYNC_ERROR:", e);
  process.exit(1);
});

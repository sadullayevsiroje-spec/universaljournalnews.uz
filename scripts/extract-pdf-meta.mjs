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

  // Juda qisqa bo'lsa (masalan "nutrition.") paragraph emas
  if (l.length < 18) return false;

  // Ko'pincha matn paragrafi: "The ...", "This ...", "In ...", "According ..."
  // Hamda "Conclusion:" kabi bo'limlar
  return /^(The|This|In|According|Recent|Conclusion|Background|Introduction)\b/.test(l);
}

function extract(text) {
  const t = clean(text);

  // ABSTRACT
  const abstractMatch =
    t.match(/(?:^|\n)\s*Abstract\s*:\s*([\s\S]*?)(?=\n\s*(?:Key\s*words?|Keywords?)\s*[:\-—]|(?:\n\s*\d+\.\s*Introduction\b)|\n\s*Introduction\b|\n\s*Background\b|$)/i) ||
    t.match(/(?:^|\n)\s*ABSTRACT\s*\n+([\s\S]*?)(?=\n\s*(?:Key\s*words?|Keywords?)\s*[:\-—]|(?:\n\s*\d+\.\s*INTRODUCTION\b)|\n\s*INTRODUCTION\b|\n\s*BACKGROUND\b|$)/);

  const abstract = abstractMatch ? clean(abstractMatch[1]) : "";

  // KEYWORDS (wrap-safe)
  // 1) Keywords qatorini topamiz
  const kwLineMatch = t.match(/(?:^|\n)\s*(?:Key\s*words?|Keywords?)\s*[:\-—]\s*([^\n]*)(?:\n|$)/i);
  if (!kwLineMatch) return { abstract, keywords: [] };

  const firstLine = (kwLineMatch[1] || "").trim();

  // 2) Keywords'dan keyingi qatorni olamiz (wrap bo'lishi mumkin)
  // Matndan keywords qatori tugagan indexni topamiz:
  const idx = kwLineMatch.index ?? 0;
  const upto = t.slice(0, idx);
  const rest = t.slice(idx);

  // rest ichida keywords qatoridan keyingi qatorni ajratib olamiz
  const restLines = rest.replace(/^\s*(?:Key\s*words?|Keywords?)\s*[:\-—]\s*[^\n]*\n?/i, "").split("\n");
  const secondLine = (restLines[0] || "").trim(); // keywordsdan keyingi 1-qator

  // 3) Agar secondLine paragraf bo'lsa — olmaymiz. Aks holda keywords continuation deb olamiz.
  let kwCombined = firstLine;
  if (secondLine && !looksLikeParagraphStart(secondLine)) {
    kwCombined = (kwCombined + " " + secondLine).trim();
  }

  // 4) Tozalash va split
  kwCombined = kwCombined.replace(/\.$/, ""); // oxiridagi nuqta
  const keywords = kwCombined
    ? kwCombined
        .split(/[,;•·]+/g)
        .map((x) => x.trim())
        .filter(Boolean)
    : [];

  return { abstract, keywords };
}

async function main() {
  const pdfArg = process.argv[2];
  if (!pdfArg) {
    console.error("Usage: node scripts/extract-pdf-meta.mjs ./public/pdf/article-1.pdf");
    process.exit(1);
  }

  const pdfPath = path.resolve(pdfArg);
  const buf = fs.readFileSync(pdfPath);
  const r = await pdfParse(buf);
  const text = clean(r.text || "");

  const { abstract, keywords } = extract(text);

  console.log(
    JSON.stringify(
      {
        pdfPath,
        bytes: buf.length,
        pages: r.numpages,
        textLen: text.length,
        abstract,
        keywords,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error("EXTRACT_ERROR:", e);
  process.exit(1);
});

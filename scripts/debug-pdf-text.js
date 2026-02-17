const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

(async () => {
  try {
    const pdfPath = process.argv[2] || "./public/pdf/article-1.pdf";
    const abs = path.resolve(pdfPath);
    const buf = fs.readFileSync(abs);

    const r = await pdfParse(buf);
    const text = (r.text || "").replace(/\r/g, "").trim();

    console.log("PDF:", abs);
    console.log("BYTES:", buf.length);
    console.log("PAGES:", r.numpages);
    console.log("TEXT_LEN:", text.length);
    console.log("----- FIRST 20 LINES -----");
    console.log(text.split("\n").slice(0, 20).join("\n"));
  } catch (err) {
    console.error("PDF_PARSE_ERROR:", err);
    process.exitCode = 1;
  }
})();

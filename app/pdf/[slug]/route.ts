import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const pdfPath = path.join(process.cwd(), "public", "pdfs", `${slug}.pdf`);

  try {
    const file = await fs.readFile(pdfPath);
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${slug}.pdf"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new Response("PDF not found", { status: 404 });
  }
}
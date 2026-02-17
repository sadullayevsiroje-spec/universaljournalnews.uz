import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    select: { title: true, abstract: true, pdfUrl: true },
  });

  if (!article) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(article);
}
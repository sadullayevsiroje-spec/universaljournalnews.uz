import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getIssues() {
  try {
    const articles = await prisma.article.findMany({
      include: {
        issue: true
      },
      where: {
        issueId: {
          not: null
        }
      }
    });

    const groups = new Map<string, { year: number; volume: number; issue: number; publishedAt: string; count: number }>();

    for (const article of articles) {
      if (!article.issue) continue;
      
      const key = `${article.issue.year}-${article.issue.volume}-${article.issue.number}`;
      
      if (!groups.has(key)) {
        groups.set(key, {
          year: article.issue.year,
          volume: article.issue.volume || 1,
          issue: article.issue.number || 1,
          publishedAt: article.issue.publishedAt?.toISOString().split('T')[0] || '',
          count: 0
        });
      }
      
      groups.get(key)!.count++;
    }

    return Array.from(groups.values())
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        if (a.volume !== b.volume) return b.volume - a.volume;
        return b.issue - a.issue;
      });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}

export default async function IssuesIndexPage() {
  const list = await getIssues();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">Issues</h1>
        <p className="text-gray-600">
          Browse published issues of Universal Journal News (UJN).
        </p>
      </header>

      <div className="grid gap-4">
        {list.map((it) => (
          <Link
            key={`${it.year}-${it.volume}-${it.issue}`}
            href={`/issues/${it.year}/${it.volume}/${it.issue}`}
            className="rounded-2xl border p-5 hover:bg-gray-50 transition"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-1">
                <div className="font-semibold">
                  Issue {it.issue} • Volume {it.volume} • {it.year}
                </div>
                <div className="text-sm text-gray-600">
                  {it.publishedAt ? new Date(it.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'January 2026'}
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {it.publishedAt ? `Published: ${it.publishedAt}` : ""}
              </div>
            </div>

            <div className="pt-2 text-sm text-gray-500">
              Articles: {it.count}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

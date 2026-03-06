// app/issues/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getIssueArchives() {
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

    const groups = new Map<string, { label: string; year: number; volume: number; number: number; count: number }>();

    for (const article of articles) {
      if (!article.issue) continue;
      
      const key = `${article.issue.year}-V${String(article.issue.volume).padStart(2, "0")}-N${String(article.issue.number).padStart(2, "0")}`;
      
      if (!groups.has(key)) {
        groups.set(key, {
          label: `Vol. ${article.issue.volume} No. ${article.issue.number} (${article.issue.year})`,
          year: article.issue.year,
          volume: article.issue.volume || 0,
          number: article.issue.number || 0,
          count: 0
        });
      }
      
      groups.get(key)!.count++;
    }

    return Array.from(groups.entries())
      .map(([key, g]) => ({ key, ...g }))
      .sort((a, b) => {
        if (a.year !== b.year) return b.year - a.year;
        if (a.volume !== b.volume) return b.volume - a.volume;
        return b.number - a.number;
      });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}

export default async function IssuesPage() {
  const issues = await getIssueArchives();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold">Archives / Issues</h1>

      {issues.length === 0 ? (
        <p className="text-sm text-gray-600">No issues yet.</p>
      ) : (
        <div className="rounded-2xl border overflow-hidden">
          <div className="px-5 py-3 border-b bg-gray-50">
            <p className="font-semibold">All Issues</p>
          </div>

          <ul className="divide-y">
            {issues.map((i) => (
              <li key={i.key} className="p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{i.label}</p>
                  <p className="text-sm text-gray-600">{i.count} articles</p>
                </div>

                {/* keyinchalik /issues/[key] sahifasini qilamiz */}
                <Link
                  className="text-sm font-semibold underline underline-offset-4"
                  href="/"
                >
                  Open
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

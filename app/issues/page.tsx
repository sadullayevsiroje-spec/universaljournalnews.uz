import Link from "next/link";
import issues from "@/data/issues.json";

type Issue = {
  year: number;
  volume: number;
  issue: number;
  title?: string;
  publishedAt?: string;
  articles?: { slug: string }[];
};

export default function IssuesIndexPage() {
  const list = (issues as Issue[]).slice().sort((a, b) => {
    // yangi issue yuqorida chiqsin
    if (a.year !== b.year) return b.year - a.year;
    if (a.volume !== b.volume) return b.volume - a.volume;
    return b.issue - a.issue;
  });

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
                {it.title ? (
                  <div className="text-sm text-gray-600">{it.title}</div>
                ) : null}
              </div>

              <div className="text-sm text-gray-500">
                {it.publishedAt ? `Published: ${it.publishedAt}` : ""}
              </div>
            </div>

            {typeof it.articles?.length === "number" ? (
              <div className="pt-2 text-sm text-gray-500">
                Articles: {it.articles.length}
              </div>
            ) : null}
          </Link>
        ))}
      </div>
    </main>
  );
}

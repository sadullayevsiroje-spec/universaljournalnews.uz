// app/page.tsx
import Link from "next/link";
import { journalInfo } from "@/data/journal";
import { getCurrentIssue } from "@/lib/issues";

export default function HomePage() {
  const currentIssue = getCurrentIssue();

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      {/* ...About the Journal... */}

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Current Issue</h2>
            <p className="text-gray-600 text-sm">{currentIssue.label}</p>
            {currentIssue.published && (
              <p className="text-gray-500 text-sm">Published: {currentIssue.published}</p>
            )}
          </div>

          <Link
            href="/issues"
            className="text-sm font-semibold underline underline-offset-4"
          >
            View All Issues
          </Link>
        </div>

        <div className="rounded-2xl border overflow-hidden">
          <div className="px-5 py-3 border-b bg-gray-50">
            <h3 className="font-semibold">Articles</h3>
          </div>

          {currentIssue.articles.length === 0 ? (
            <div className="p-5 text-sm text-gray-600">
              No articles found for the current issue yet.
            </div>
          ) : (
            <ul className="divide-y">
              {currentIssue.articles.map((a) => (
                <li key={a.articleHref} className="p-5 space-y-2">
                  <h4 className="text-lg font-semibold leading-snug">
                    <Link href={a.articleHref} className="hover:underline underline-offset-4">
                      {a.title}
                    </Link>
                  </h4>

                  <p className="text-sm text-gray-600">{a.authors}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    {a.pages && <span className="text-sm text-gray-500">{a.pages}</span>}

                    {a.pdfHref && (
                      <Link
                        href={a.pdfHref}
                        className="inline-flex items-center rounded-xl border px-3 py-1.5 text-sm font-semibold hover:bg-gray-50"
                      >
                        PDF
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ...footer... */}
    </main>
  );
}

// app/issues/page.tsx
import Link from "next/link";
import { getIssueArchives } from "@/lib/issues";

export default function IssuesPage() {
  const issues = getIssueArchives();

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

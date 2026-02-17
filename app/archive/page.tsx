import articles from "@/data/articles.json";
import Link from "next/link";

export default function ArchivePage() {
  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        Archive – Universal Journal News
      </h1>

      <ul className="space-y-4">
        {articles.map((a) => (
          <li key={a.slug}>
            <Link href={`/articles/${a.slug}`} className="text-blue-600 underline">
              {a.title}
            </Link>
            <div className="text-sm text-gray-600">
              {a.published}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

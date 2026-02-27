import Link from 'next/link'

export default function IssuePage({ 
  params 
}: { 
  params: { year: string; volume: string; issue: string } 
}) {
  const articles = [
    {
      id: 1,
      title: "Sample Article Title",
      authors: ["Author Name"],
      pages: "1-10",
      doi: "10.xxxxx/mjimr.2026.001"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Vol. {params.volume} No. {params.issue} ({params.year})
        </h1>
        <Link href="/archive" className="text-blue-600 hover:underline">
          ← Back to Archives
        </Link>
      </div>

      <div className="space-y-6">
        {articles.length > 0 ? (
          articles.map((article) => (
            <article key={article.id} className="bg-white p-6 rounded-lg shadow border">
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                {article.title}
              </h2>
              <p className="text-gray-600 mb-2">
                {article.authors.join(', ')}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Pages: {article.pages} | DOI: {article.doi}
              </p>
              <div className="flex gap-4">
                <button className="text-blue-600 hover:underline">Abstract</button>
                <button className="text-blue-600 hover:underline">PDF</button>
              </div>
            </article>
          ))
        ) : (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600">No articles published in this issue yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

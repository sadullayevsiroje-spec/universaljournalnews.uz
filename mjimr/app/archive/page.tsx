import Link from 'next/link'

export default function ArchivePage() {
  const issues = [
    { year: 2026, volume: 1, issue: 1, published: "2026-02-20" }
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Archives</h1>
      
      <div className="space-y-4">
        {issues.map((item) => (
          <div key={`${item.year}-${item.volume}-${item.issue}`} className="bg-white p-6 rounded-lg shadow border hover:shadow-lg transition">
            <Link href={`/issues/${item.year}/${item.volume}/${item.issue}`}>
              <h3 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                Vol. {item.volume} No. {item.issue} ({item.year})
              </h3>
              <p className="text-gray-600">Published: {item.published}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

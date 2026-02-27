import Link from 'next/link'
import { currentIssue } from '@/data/currentIssue'

export default function CurrentIssuePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Current Issue</h1>
      
      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          Vol. {currentIssue.volume} No. {currentIssue.issue} ({currentIssue.year})
        </h2>
        <p className="text-gray-600 mb-4">Published: {currentIssue.published}</p>
        <Link 
          href={`/issues/${currentIssue.year}/${currentIssue.volume}/${currentIssue.issue}`}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          View All Articles
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-600">
          Articles for this issue will be added soon. Check back later for updates.
        </p>
      </div>
    </div>
  )
}

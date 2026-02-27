import Link from 'next/link'
import { journal } from '@/data/journal'
import { currentIssue } from '@/data/currentIssue'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12 py-8 border-b">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{journal.name}</h1>
        <p className="text-gray-600">{journal.description}</p>
        <div className="mt-4 text-sm text-gray-500">
          ISSN: {journal.issn} | {journal.frequency} | Open Access
        </div>
      </div>

      {/* Current Issue */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Current Issue</h2>
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
          <h3 className="text-xl font-semibold mb-2">
            Vol. {currentIssue.volume} No. {currentIssue.issue} ({currentIssue.year})
          </h3>
          <p className="text-gray-600 mb-4">Published: {currentIssue.published}</p>
          <Link 
            href={`/issues/${currentIssue.year}/${currentIssue.volume}/${currentIssue.issue}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            View Issue
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">About the Journal</h3>
          <p className="text-gray-600 mb-4">
            {journal.name} is a peer-reviewed open access journal dedicated to publishing 
            high-quality research in medical and health sciences.
          </p>
          <Link href="/about" className="text-blue-600 hover:underline">
            Read more →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-800">For Authors</h3>
          <p className="text-gray-600 mb-4">
            Submit your research to reach a global audience. We welcome original research 
            articles, reviews, and case studies.
          </p>
          <Link href="/author-guidelines" className="text-blue-600 hover:underline">
            Submission Guidelines →
          </Link>
        </div>
      </section>
    </div>
  )
}

import { journal } from '@/data/journal'

export default function AuthorGuidelinesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Author Guidelines</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Manuscript Submission</h2>
          <p className="text-gray-700 mb-4">
            Authors are invited to submit original research articles, review articles, and case studies 
            to {journal.shortName}. All submissions should be made via email to {journal.email}.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Manuscript Preparation</h2>
          
          <h3 className="text-xl font-semibold mb-3 mt-6">General Requirements</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Manuscripts should be written in English</li>
            <li>Use Times New Roman, 12-point font</li>
            <li>Double-space throughout</li>
            <li>Number all pages consecutively</li>
            <li>Submit in Microsoft Word (.docx) format</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-6">Manuscript Structure</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Title Page:</strong> Include title, authors, affiliations, and corresponding author details</li>
            <li><strong>Abstract:</strong> 250-300 words, structured (Background, Methods, Results, Conclusion)</li>
            <li><strong>Keywords:</strong> 4-6 keywords</li>
            <li><strong>Introduction:</strong> Background and objectives</li>
            <li><strong>Methods:</strong> Detailed methodology</li>
            <li><strong>Results:</strong> Present findings clearly</li>
            <li><strong>Discussion:</strong> Interpret results</li>
            <li><strong>Conclusion:</strong> Summary of key findings</li>
            <li><strong>References:</strong> Use Vancouver style</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Peer Review Process</h2>
          <p className="text-gray-700 mb-4">
            All submissions undergo double-blind peer review. The review process typically takes 4-6 weeks.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Publication Fees</h2>
          <p className="text-gray-700 mb-4">
            As an open access journal, there are article processing charges (APC) for accepted manuscripts. 
            Please contact the editorial office for current fee information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-700">
            For submission inquiries, please contact: <a href={`mailto:${journal.email}`} className="text-blue-600 hover:underline">{journal.email}</a>
          </p>
        </section>
      </div>
    </div>
  )
}

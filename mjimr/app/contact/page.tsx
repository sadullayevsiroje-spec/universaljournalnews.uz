import { journal } from '@/data/journal'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Editorial Office</h2>
            <p className="text-gray-700">{journal.name}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-700">
              <a href={`mailto:${journal.email}`} className="text-blue-600 hover:underline">
                {journal.email}
              </a>
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">For Authors</h3>
            <p className="text-gray-700">
              Manuscript submissions and inquiries: {journal.email}
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">For Reviewers</h3>
            <p className="text-gray-700">
              Peer review inquiries: {journal.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { journal } from '@/data/journal'

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">About {journal.shortName}</h1>
      
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Journal Overview</h2>
          <p className="text-gray-700 mb-4">
            {journal.name} ({journal.shortName}) is an international, peer-reviewed, open access journal 
            that publishes high-quality research in medical and health sciences. Established in {journal.established}, 
            the journal aims to advance medical knowledge and improve healthcare outcomes globally.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Scope</h2>
          <p className="text-gray-700 mb-4">
            The journal welcomes submissions in all areas of medical and health sciences, including but not limited to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Clinical Medicine</li>
            <li>Public Health</li>
            <li>Epidemiology</li>
            <li>Medical Technology</li>
            <li>Healthcare Management</li>
            <li>Biomedical Research</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Open Access Policy</h2>
          <p className="text-gray-700 mb-4">
            This is an open access journal which means that all content is freely available without charge 
            to the user or their institution. Users are allowed to read, download, copy, distribute, print, 
            search, or link to the full texts of the articles in this journal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Publication Frequency</h2>
          <p className="text-gray-700">
            {journal.shortName} is published {journal.frequency.toLowerCase()}.
          </p>
        </section>
      </div>
    </div>
  )
}

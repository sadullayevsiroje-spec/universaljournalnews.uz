import { journalInfo } from "@/data/journal";

export const metadata = {
  title: "About | Universal Journal News",
  description: "About Universal Journal News (UJN): mission, scope, and publishing model.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">About Universal Journal News</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Journal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <strong className="text-gray-700">Journal Name:</strong>
            <p>{journalInfo.name}</p>
          </div>
          <div className="border rounded-lg p-4">
            <strong className="text-gray-700">ISSN:</strong>
            <p>{journalInfo.issn}</p>
          </div>
          <div className="border rounded-lg p-4">
            <strong className="text-gray-700">Publisher:</strong>
            <p>{journalInfo.publisher}</p>
          </div>
          <div className="border rounded-lg p-4">
            <strong className="text-gray-700">Frequency:</strong>
            <p>Monthly</p>
          </div>
          <div className="border rounded-lg p-4">
            <strong className="text-gray-700">Language:</strong>
            <p>English, Uzbek, Russian</p>
          </div>
          <div className="border rounded-lg p-4">
            <strong className="text-gray-700">First Published:</strong>
            <p>{journalInfo.firstPublished}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Mission & Scope</h2>
        <p className="text-gray-700 leading-relaxed">
          {journalInfo.description}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Subject Areas</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {journalInfo.subjects.map((subject) => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Open Access Policy</h2>
        <p className="text-gray-700 leading-relaxed">
          Universal Journal News is an open access journal. All articles are freely available 
          to read, download, and share under Creative Commons license. There are no subscription 
          fees or paywalls.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-gray-700">
          <strong>Email:</strong>{" "}
          <a href={`mailto:${journalInfo.email}`} className="text-blue-600 hover:underline">
            {journalInfo.email}
          </a>
        </p>
        <p className="text-gray-700">
          <strong>Website:</strong>{" "}
          <a href={journalInfo.url} className="text-blue-600 hover:underline">
            {journalInfo.url}
          </a>
        </p>
      </section>
    </main>
  );
}

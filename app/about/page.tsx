import { journalInfo } from "@/data/journal";

export const metadata = {
  title: "About | Universal Journal News",
  description: "About Universal Journal News (UJN): mission, scope, and publishing model.",
};

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Universal Journal News</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-400 mx-auto rounded-full"></div>
        </div>
        
        {/* Journal Information Cards */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Journal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white border-l-4 border-blue-600 rounded-lg p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-sm text-gray-500 mb-1">Journal Name</div>
              <div className="font-semibold text-gray-900">{journalInfo.name}</div>
            </div>
            <div className="bg-white border-l-4 border-green-600 rounded-lg p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-sm text-gray-500 mb-1">ISSN</div>
              <div className="font-semibold text-gray-900">{journalInfo.issn}</div>
            </div>
            <div className="bg-white border-l-4 border-purple-600 rounded-lg p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-sm text-gray-500 mb-1">Publisher</div>
              <div className="font-semibold text-gray-900">{journalInfo.publisher}</div>
            </div>
            <div className="bg-white border-l-4 border-orange-600 rounded-lg p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-sm text-gray-500 mb-1">Frequency</div>
              <div className="font-semibold text-gray-900">Monthly</div>
            </div>
            <div className="bg-white border-l-4 border-red-600 rounded-lg p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-sm text-gray-500 mb-1">Language</div>
              <div className="font-semibold text-gray-900">English, Uzbek, Russian</div>
            </div>
            <div className="bg-white border-l-4 border-indigo-600 rounded-lg p-5 shadow-md hover:shadow-xl transition-all">
              <div className="text-sm text-gray-500 mb-1">First Published</div>
              <div className="font-semibold text-gray-900">{journalInfo.firstPublished}</div>
            </div>
          </div>
        </section>

        {/* Mission & Scope */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Mission & Scope
            </h2>
            <p className="text-blue-50 leading-relaxed text-lg">
              {journalInfo.description}
            </p>
          </div>
        </section>

        {/* Subject Areas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Subject Areas
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {journalInfo.subjects.map((subject, index) => (
                <div key={subject} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-gray-700 font-medium">{subject}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Access Policy */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-green-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Open Access Policy
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Universal Journal News is an open access journal. All articles are freely available 
              to read, download, and share under Creative Commons license. There are no subscription 
              fees or paywalls.
            </p>
            <div className="mt-6 flex gap-4">
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Free to Read</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">Free to Share</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="font-semibold">No Fees</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-gray-400 text-sm mb-2">Email</div>
                <a href={`mailto:${journalInfo.email}`} className="text-xl text-blue-400 hover:text-blue-300 transition-colors">
                  {journalInfo.email}
                </a>
              </div>
              <div>
                <div className="text-gray-400 text-sm mb-2">Website</div>
                <a href={journalInfo.url} className="text-xl text-blue-400 hover:text-blue-300 transition-colors">
                  {journalInfo.url}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

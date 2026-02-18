export default function Topbar() {
  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            UJN
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Universal Journal News</h1>
            <p className="text-xs text-gray-600">International Multidisciplinary Research Journal</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-gray-600 hover:text-blue-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <span className="text-sm text-gray-600">|</span>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Login</button>
        </div>
      </div>
    </div>
  );
}

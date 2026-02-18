export default function Topbar() {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Universal Journal News</h1>
          <p className="text-xs text-blue-200">International Multidisciplinary Research Journal</p>
        </div>
        <div className="text-right text-sm">
          <p className="text-blue-200">ISSN: 3030-7551 (Online)</p>
          <p className="text-blue-200">Open Access Journal</p>
        </div>
      </div>
    </div>
  );
}

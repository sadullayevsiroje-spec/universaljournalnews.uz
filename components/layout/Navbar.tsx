export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <a href="/" className="px-4 py-3 hover:bg-blue-800 transition font-medium">Home</a>
          <a href="/about" className="px-4 py-3 hover:bg-blue-800 transition">About</a>
          <a href="/issues" className="px-4 py-3 hover:bg-blue-800 transition">Archives</a>
          <a href="/author-guidelines" className="px-4 py-3 hover:bg-blue-800 transition">For Authors</a>
          <a href="/editorial-board" className="px-4 py-3 hover:bg-blue-800 transition">Editorial Board</a>
          <a href="/policies" className="px-4 py-3 hover:bg-blue-800 transition">Policies</a>
          <a href="/contact" className="px-4 py-3 hover:bg-blue-800 transition">Contact</a>
        </div>
      </div>
    </nav>
  );
}

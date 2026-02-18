export default function Navbar() {
  const linkStyle = "px-4 py-3 hover:bg-blue-700 transition-colors duration-200";

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <a href="/" className={linkStyle}>Home</a>
            <a href="/issues" className={linkStyle}>Current Issue</a>
            <a href="/archive" className={linkStyle}>Archive</a>
            <a href="/author-guidelines" className={linkStyle}>For Authors</a>
            <a href="/editorial-board" className={linkStyle}>Editorial Board</a>
            <a href="/policies" className={linkStyle}>Policies</a>
            <a href="/about" className={linkStyle}>About</a>
            <a href="/contact" className={linkStyle}>Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

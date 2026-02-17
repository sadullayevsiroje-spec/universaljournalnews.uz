export default function Navbar() {
  const linkStyle: React.CSSProperties = {
    marginRight: 14,
    textDecoration: "none",
  };

  return (
    <nav style={{ padding: "10px 16px", borderBottom: "1px solid #eee" }}>
      <a href="/" style={linkStyle}>Home</a>
      <a href="/issues" style={linkStyle}>Issues</a>
      <a href="/editorial-board" style={linkStyle}>Editorial Board</a>
      <a href="/policies" style={linkStyle}>Policies</a>
      <a href="/about" style={linkStyle}>About</a>
      <a href="/contact" style={linkStyle}>Contact</a>
    </nav>
  );
}

import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Universaljournal",
  description: "Academic Journal Platform",
}

const nav = [
  { href: "/", label: "Home" },
  { href: "/archive", label: "Archive" },
  { href: "/about", label: "About" },
  { href: "/editorial-board", label: "Editorial Board" },
  { href: "/author-guidelines", label: "Author Guidelines" },
  { href: "/publication-ethics", label: "Publication Ethics" },
  { href: "/contact", label: "Contact" },
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, Arial" }}>
        <header style={{ borderBottom: "1px solid #eee", padding: "14px 24px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
            <Link href="/" style={{ textDecoration: "none", color: "black", fontWeight: 700, fontSize: 20 }}>
              Universaljournal
            </Link>
            <nav style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{ textDecoration: "none", color: "#0b57d0", fontSize: 14 }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        {children}

        <footer style={{ borderTop: "1px solid #eee", padding: "16px 24px", fontSize: 12, opacity: 0.8 }}>
          © {new Date().getFullYear()} universaljournalnews.uz
        </footer>
      </body>
    </html>
  )
}

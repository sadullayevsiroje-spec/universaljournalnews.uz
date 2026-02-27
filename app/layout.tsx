import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Universal Journal News",
  description: "Academic journal publishing platform",
  metadataBase: new URL('https://universaljournalnews.uz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Universal Journal News",
    description: "Academic journal publishing platform",
    url: 'https://universaljournalnews.uz',
    siteName: 'Universal Journal News',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

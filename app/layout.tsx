import "./globals.css";
import Topbar from "@/components/layout/Topbar";
import Navbar from "@/components/layout/Navbar";

export const metadata = {
  title: "Universal Journal News",
  description: "Academic journal publishing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

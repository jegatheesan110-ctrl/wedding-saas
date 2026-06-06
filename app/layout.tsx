import type { Metadata } from "next";
import { Catamaran, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/SessionProvider";

const catamaran = Catamaran({
  subsets: ["latin", "tamil"],
  variable: "--font-catamaran",
  weight: ["400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "வந்தனம் - 3D Tamil Wedding Invitations",
    template: "%s | வந்தனம்",
  },
  description: "Create beautiful 3D digital wedding invitations in Tamil. Share via WhatsApp instantly.",
  keywords: ["tamil wedding invitation", "digital wedding card", "3D wedding invitation", "திருமண அழைப்பிதழ்"],
  openGraph: {
    title: "வந்தனம் - 3D Tamil Wedding Invitations",
    description: "Create beautiful 3D digital wedding invitations in Tamil. Share via WhatsApp instantly.",
    type: "website",
    siteName: "வந்தனம்",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "வந்தனம் - 3D Tamil Wedding Invitations",
      }
    ]
  },
  verification: {
    google: "xtUh6TyPUhLrT9oaLk1TqZYjY1JR11MtnHJNxMAGWSk",
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ta" className={`${catamaran.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#FAF7F2] font-tamil text-[#1a1a2e] antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

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
    default: "வந்தனம் | டிஜிட்டல் திருமண அழைப்பிதழ்",
    template: "%s | வந்தனம்",
  },
  description: "வந்தனம் - தமிழ் திருமண டிஜிட்டல் அழைப்பிதழ் உருவாக்கும் தளம்",
  openGraph: {
    title: "வந்தனம் | டிஜிட்டல் திருமண அழைப்பிதழ்",
    description: "வந்தனம் - தமிழ் திருமண டிஜிட்டல் அழைப்பிதழ் உருவாக்கும் தளம்",
    type: "website",
    siteName: "வந்தனம்",
  },
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

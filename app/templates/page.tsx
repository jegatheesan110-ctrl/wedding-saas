import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Mail, Clock } from "lucide-react";
import { AdminHeader } from "@/components/ui/AdminHeader";

export const metadata: Metadata = {
  title: "Templates | Zareqia Designs",
};

const templates = [
  {
    id: "royal-elegance",
    title: "ராயல் எலிகன்ஸ்",
    description: "Classic ivory and gold with palace motifs and original door opening",
    badge: "Most Liked",
    badgeColor: "bg-pink-500 text-white",
    thumbnailBg: "linear-gradient(135deg, #800020, #4A0010)",
    btnBg: "#800020",
    btnText: "#D4AF37",
    accentColor: "#D4AF37",
    palette: ["#800020", "#4A0010", "#D4AF37", "#FFFDD0"],
    demoUrl: "/invitation/demo-royal-elegance",
  },
  {
    id: "garden-romance",
    title: "கார்டன் ரொமான்ஸ்",
    description: "Soft rose and blush with floral accents and original door opening",
    badge: "New",
    badgeColor: "bg-green-600 text-white",
    thumbnailBg: "linear-gradient(135deg, #2D5A27, #1A3A15)",
    btnBg: "#2D5A27",
    btnText: "#D4AF37",
    accentColor: "#D4AF37",
    palette: ["#2D5A27", "#1A3A15", "#D4AF37", "#FFD0DA"],
    demoUrl: "/invitation/demo-garden-romance",
  },
  {
    id: "modern-minimal",
    title: "மாடர்ன் மினிமல்",
    description: "Deep navy and gold with geometric patterns and original door opening",
    badge: "New",
    badgeColor: "bg-slate-700 text-white",
    thumbnailBg: "linear-gradient(135deg, #1A1A2E, #0A0A15)",
    btnBg: "#1A1A2E",
    btnText: "#D4AF37",
    accentColor: "#D4AF37",
    palette: ["#1A1A2E", "#0A0A15", "#D4AF37", "#FFFFFF"],
    demoUrl: "/invitation/demo-modern-minimal",
  },
  {
    id: "mughal-emerald",
    title: "முகல் எமரால்ட்",
    description: "Emerald green and gold with Mughal-inspired floral original door opening",
    badge: "New",
    badgeColor: "bg-emerald-600 text-white",
    thumbnailBg: "linear-gradient(135deg, #1A4A2E, #0A2A1A)",
    btnBg: "#1A4A2E",
    btnText: "#D4AF37",
    accentColor: "#D4AF37",
    palette: ["#1A4A2E", "#0A2A1A", "#D4AF37", "#FFFFF0"],
    demoUrl: "/invitation/demo-mughal-emerald",
  },
  {
    id: "rose-gold-blush",
    title: "ரோஸ் கோல்ட் ப்ளஷ்",
    description: "Blush pink and rose gold with ornate original door animation",
    badge: "Popular",
    badgeColor: "bg-[#B76E79] text-white",
    thumbnailBg: "linear-gradient(135deg, #B76E79, #8B4558)",
    btnBg: "#B76E79",
    btnText: "white",
    accentColor: "#B76E79",
    palette: ["#B76E79", "#8B4558", "#F4C2C2", "#FFFFFF"],
    demoUrl: "/invitation/demo-rose-gold-blush",
  },
  {
    id: "midnight-royal",
    title: "மிட்நைட் ராயல்",
    description: "Deep purple and silver with celestial star-themed original door opening",
    badge: "New",
    badgeColor: "bg-purple-600 text-white",
    thumbnailBg: "linear-gradient(135deg, #1A0A3E, #0A0520)",
    btnBg: "#1A0A3E",
    btnText: "#C0C0C0",
    accentColor: "#C0C0C0",
    palette: ["#1A0A3E", "#0A0520", "#C0C0C0", "#111A63"],
    demoUrl: "/invitation/demo-midnight-royal",
  },
];

export default async function TemplatesPage() {
  const getHref = (templateId: string) => {
    return `/checkout?template=${templateId}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      {/* Navbar */}
      <AdminHeader />

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-[#D4AF37]">
            உங்கள் design தேர்வு செய்யுங்கள்
          </p>
          <h1 className="mt-4 font-tamil text-4xl sm:text-5xl font-bold text-gray-900">
            திருமண Templates
          </h1>
          <div className="mx-auto mt-4 h-0.5 w-24 bg-[#D4AF37]"></div>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            உங்கள் காதல் கதைக்கு பேசும் template தேர்வு செய்யுங்கள். அனைத்து 6
            premium designs உங்கள் purchase-ல் included.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {templates.map((template) => (
            <div
              key={template.id}
              className="group relative flex flex-col rounded-[20px] bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Thumbnail */}
              <div
                style={{ background: template.thumbnailBg }}
                className="relative flex h-[220px] w-full items-center justify-center"
              >
                {template.badge && (
                  <span
                    className={`absolute left-4 top-4 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-sm ${template.badgeColor}`}
                  >
                    {template.badge}
                  </span>
                )}
                
                {/* Palette Dots */}
                <div className="absolute right-4 top-4 flex gap-1.5">
                  {template.palette.map((color, idx) => (
                    <div 
                      key={idx} 
                      className="h-3 w-3 rounded-full border border-white/20 shadow-sm" 
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                <div className="text-center">
                  <span 
                    className="font-tamil text-2xl font-bold drop-shadow-md"
                    style={{ color: template.accentColor }}
                  >
                    {template.title}
                  </span>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[3px] text-white/60">
                    Premium Design
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-[20px] font-bold text-gray-900">
                    {template.title}
                  </h3>
                  <div className="flex -space-x-1">
                    {template.palette.slice(0, 3).map((color, i) => (
                      <div key={i} className="h-4 w-4 rounded-full border-2 border-white" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
                
                <p className="mt-3 text-[14px] text-gray-500 leading-relaxed flex-1">
                  {template.description}
                </p>

                <div className="mt-8 flex flex-col gap-4 text-center">
                  <Link
                    href={getHref(template.id)}
                    style={{ backgroundColor: template.btnBg, color: template.btnText }}
                    className="block w-full rounded-[12px] py-3.5 text-sm font-bold shadow-lg transition-all hover:brightness-110 active:scale-[0.98]"
                  >
                    Template தேர்வு செய்
                  </Link>
                  <a
                    href={template.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-semibold transition-colors hover:underline"
                    style={{ color: template.accentColor }}
                  >
                    Live Demo பார்க்க
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="group relative flex flex-col rounded-[12px] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100 opacity-80">
            <div className="relative flex h-[160px] w-full items-center justify-center rounded-t-[12px] bg-gray-50">
              <Clock className="h-8 w-8 text-gray-300" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-serif text-[18px] font-bold text-gray-400">
                Coming Soon
              </h3>
              <p className="mt-2 text-[13px] text-gray-400 leading-relaxed flex-1">
                New designs on the way
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-[#FAF7F2] py-12 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/"
            className="inline-block font-tamil text-3xl text-[#D4AF37] mb-8"
          >
            வந்தனம்
          </Link>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 mb-8">
            <Link href="#" className="hover:text-[#D4AF37]">பற்றி</Link>
            <Link href="#" className="hover:text-[#D4AF37]">தொடர்பு</Link>
            <Link href="#" className="hover:text-[#D4AF37]">விதிமுறைகள்</Link>
            <Link href="#" className="hover:text-[#D4AF37]">தனியுரிமை</Link>
            <Link href="#" className="hover:text-[#D4AF37]">Refund Policy</Link>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <a href="#" className="text-gray-400 hover:text-[#D4AF37]">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#D4AF37]">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            © 2026 வந்தனம் (vanthanam.in)
          </p>
          <p className="text-xs text-gray-400">
            Digital wedding invitation service • No physical products shipped
          </p>
        </div>
      </footer>
    </div>
  );
}

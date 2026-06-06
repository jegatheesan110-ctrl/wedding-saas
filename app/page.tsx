import Link from 'next/link';
import { Store, User, Flower } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#FFFDF7] font-serif text-[#1a1a1a]">
      <div className="w-full max-w-4xl px-6 py-16 flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Flower className="w-8 h-8 text-[#8B0000] mx-auto mb-4 stroke-1" />
          <h1 className="text-4xl md:text-6xl font-tamil text-[#8B0000] tracking-wide mb-4">
            வந்தனம்
          </h1>
          <div className="h-[1px] w-16 bg-[#C9A84C] mx-auto mb-6"></div>
          <p className="text-sm md:text-base text-gray-500 font-light tracking-widest max-w-lg mx-auto uppercase">
            உங்கள் திருமண அழைப்பிதழை அழகாக உருவாக்குங்கள்
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
          {/* Individual Card */}
          <div className="flex flex-col bg-white border border-[#C9A84C] p-10 text-center shadow-sm items-center">
            <User className="w-8 h-8 text-[#8B0000] mb-6 stroke-1" />
            <h2 className="text-2xl font-bold font-tamil text-[#1a1a1a] mb-2 tracking-wide">
              தனிப்பட்டவர்
            </h2>
            <p className="text-gray-500 font-light tracking-wide text-sm mb-8">
              வெறும் ₹199 — ஒரு Invitation
            </p>
            <Link 
              href="/templates" 
              className="mt-auto w-full bg-[#8B0000] text-white py-3 text-sm tracking-widest uppercase hover:bg-[#6b0000] transition-colors"
            >
              தொடர (Continue)
            </Link>
          </div>

          {/* Shop Owner Card */}
          <div className="flex flex-col bg-white border border-[#C9A84C] p-10 text-center shadow-sm items-center">
            <Store className="w-8 h-8 text-[#8B0000] mb-6 stroke-1" />
            <h2 className="text-2xl font-bold font-tamil text-[#1a1a1a] mb-2 tracking-wide">
              கடை உரிமையாளர்
            </h2>
            <p className="text-gray-500 font-light tracking-wide text-sm mb-8">
              ₹999-ல் 30 Invitations
            </p>
            <Link 
              href="/admin/register" 
              className="mt-auto w-full bg-[#8B0000] text-white py-3 text-sm tracking-widest uppercase hover:bg-[#6b0000] transition-colors"
            >
              தொடர (Continue)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

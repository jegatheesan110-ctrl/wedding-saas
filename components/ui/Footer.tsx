import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-gradient-to-r from-[#160f35] via-[#1f1748] to-[#130d2c] px-4 py-12 text-sm text-white/80 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-tamil text-xl text-white">அன்புடன் அழைக்கிறோம்</p>
          <p className="mt-2">© 2026 வந்தனம் (vanthanam.in). அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.</p>
        </div>
        <div className="flex gap-5">
          <Link href="/templates" className="hover:text-brand.gold">
            Templates
          </Link>
          <Link href="/pricing" className="hover:text-brand.gold">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-brand.gold">
            உள்நுழை
          </Link>
        </div>
      </div>
    </footer>
  );
}

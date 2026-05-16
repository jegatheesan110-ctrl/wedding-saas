"use client";

import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-[#E8E0D4] py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl font-bold text-[#B8860B]">
          வந்தனம்
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-[#6a6a8a]">
          <Link href="/about" className="hover:text-[#B8860B] transition-colors">பற்றி</Link>
          <Link href="/contact" className="hover:text-[#B8860B] transition-colors">தொடர்பு</Link>
          <Link href="/terms" className="hover:text-[#B8860B] transition-colors">விதிமுறைகள்</Link>
          <Link href="/privacy" className="hover:text-[#B8860B] transition-colors">தனியுரிமை</Link>
          <Link href="/refund" className="hover:text-[#B8860B] transition-colors">Refund Policy</Link>
        </nav>

        {/* Social icons */}
        <div className="flex items-center gap-5 text-[#6a6a8a]">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[#B8860B] transition-colors text-xl"
          >
            {/* Simple SVG Instagram */}
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </a>
          <a
            href="mailto:hello@vanthanam.in"
            aria-label="Email"
            className="hover:text-[#B8860B] transition-colors text-xl"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-[#a0a0bc] text-xs">
          © 2026 வந்தனம் (vanthanam.in). அன்புடன் உருவாக்கப்பட்டது 🧡
        </p>
        <p className="text-center text-[#c0c0d8] text-xs">
          Digital wedding invitation service • No physical products shipped
        </p>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function LandingHero() {
  return (
    <section className="bg-[#FAF7F2] min-h-[90vh] flex flex-col items-center justify-center px-4 pt-16 pb-8 text-center relative overflow-hidden">
      {/* Subtle decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-[#FDF3DC] border border-[#B8860B]/30 text-[#B8860B] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8 shadow-sm"
      >
        <span>✨</span>
        <span>PREMIUM DIGITAL WEDDING INVITATIONS</span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl"
      >
        <span className="text-[#1a1a2e] block">திருமண அழைப்பிதழை</span>
        <span className="text-[#B8860B] block my-1">இணையதளமாக உருவாக்குங்கள்</span>
        <span className="text-[#1a1a2e] block">சில நிமிடங்களில்</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 text-[#4a4a6a] text-base sm:text-lg max-w-xl leading-relaxed"
      >
        எளிய form பூர்த்தி செய்யுங்கள், அழகான animated அழைப்பிதழ் பெறுங்கள் — உடனே share செய்யுங்கள்
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Link
          href="/templates"
          className="btn-gold px-8 py-3.5 rounded-full text-base font-semibold shadow-lg inline-flex items-center gap-2"
        >
          இப்போதே தொடங்கு →
        </Link>
        <Link
          href="/invitation/demo-rose-gold-blush"
          className="btn-outline-gold px-8 py-3.5 rounded-full text-base font-semibold inline-flex items-center gap-2"
        >
          Live Demo பார்க்க
        </Link>
      </motion.div>

      {/* Trust text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="mt-6 text-[#8a8aaa] text-xs sm:text-sm"
      >
        நூற்றுக்கணக்கான தம்பதியர் நம்பகமான தளம் &nbsp;•&nbsp; ஒருமுறை கட்டணம் &nbsp;•&nbsp; Subscription இல்லை
      </motion.p>

      {/* Bounce arrow */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="mt-12 text-[#B8860B] text-2xl"
      >
        ↓
      </motion.div>
    </section>
  );
}

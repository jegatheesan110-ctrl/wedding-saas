"use client";

import { motion } from "framer-motion";

export function LifetimeAccessBanner() {
  return (
    <section className="bg-[#FAF7F2] px-4 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto border-2 border-[#B8860B] rounded-2xl bg-white px-8 py-8 text-center shadow-gold"
      >
        {/* Top label */}
        <p className="text-[#4a4a6a] text-sm sm:text-base font-medium">
          6 Premium திருமண அழைப்பிதழ் Templates-க்கு
        </p>

        {/* Main text */}
        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#B8860B]">
          Lifetime Access
        </h2>

        {/* Sub label */}
        <p className="mt-1 text-[#1a1a2e] text-lg font-semibold">
          ஒரே முறை கட்டணத்தில்
        </p>

        {/* Divider */}
        <div className="my-4 h-px bg-[#B8860B]/20 max-w-xs mx-auto" />

        {/* Description */}
        <p className="text-[#6a6a8a] text-sm sm:text-base leading-relaxed">
          உங்களுக்கு பிடித்த template-ஐ தேர்வு செய்து, உங்கள் விவரங்களை பூர்த்தி செய்து,
          உடனே share செய்யுங்கள் — எந்த Subscription இல்லை, மீண்டும் கட்டணம் இல்லை.
        </p>
      </motion.div>
    </section>
  );
}

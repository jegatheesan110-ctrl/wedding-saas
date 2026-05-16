"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="bg-[#F5EFE6] py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Heart */}
        <div className="w-16 h-16 border-2 border-[#B8860B] rounded-full flex items-center justify-center text-2xl mx-auto mb-6 text-[#B8860B]">
          ♡
        </div>

        {/* Heading */}
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e] leading-tight">
          உங்கள்{" "}
          <span className="text-[#B8860B]">Perfect</span>{" "}
          அழைப்பிதழை உருவாக்க தயாரா?
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-[#6a6a8a] text-base leading-relaxed">
          உங்கள் special day-க்கு elegance தேர்ந்தெடுத்த நூற்றுக்கணக்கான தம்பதியரோடு சேருங்கள்
        </p>

        {/* Button */}
        <Link
          href="/templates"
          className="btn-gold mt-8 inline-flex items-center px-10 py-4 rounded-full text-base font-semibold shadow-gold"
        >
          இப்போதே தொடங்கு →
        </Link>
      </motion.div>
    </section>
  );
}

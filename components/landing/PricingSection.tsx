"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const checklist = [
  "6 premium animated templates",
  "3D door & curtain reveal animations",
  "3 invitation links வரை",
  "Guest messaging & inbox",
  "Background music",
  "Custom image uploads",
  "Google Maps integration",
  "WhatsApp share",
  "Lifetime access",
];

export function PricingSection() {
  return (
    <section className="bg-[#FAF7F2] py-20 px-4">
      <div className="max-w-lg mx-auto text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#B8860B] text-sm font-semibold tracking-widest uppercase"
        >
          எளிய விலை
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e] gold-underline"
        >
          ஒரே விலை, அனைத்தும் included
        </motion.h2>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 bg-white border-2 border-[#B8860B] rounded-3xl p-8 shadow-gold text-left"
        >
          {/* Plan name */}
          <p className="text-[#B8860B] font-bold text-sm tracking-widest uppercase">Premium Plan</p>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-6xl font-bold text-[#1a1a2e]">₹1000</span>
          </div>
          <p className="mt-1 text-[#8a8aaa] text-sm">ஒருமுறை கட்டணம் • Lifetime access</p>

          {/* Divider */}
          <div className="my-6 h-px bg-[#E8E0D4]" />

          {/* Checklist */}
          <ul className="space-y-3">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#4a4a6a] text-sm">
                <span className="w-5 h-5 rounded-full bg-[#FDF3DC] text-[#B8860B] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/templates"
            className="btn-gold mt-8 w-full flex items-center justify-center py-3.5 rounded-xl text-base font-semibold shadow"
          >
            இப்போதே தொடங்கு →
          </Link>

          {/* Trust note */}
          <p className="mt-4 text-center text-[#a0a0bc] text-xs">
            🔒 Razorpay மூலம் பாதுகாப்பான payment
          </p>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🎯",
    title: "தேதியை Scratch செய்து பாருங்கள்",
    desc: "Interactive scratch card — guests reveal your wedding date with a fun swipe!",
  },
  {
    icon: "⏰",
    title: "Live Countdown",
    desc: "Animated countdown timer that ticks down to your special day in real time.",
  },
  {
    icon: "💬",
    title: "Guest Messaging & Inbox",
    desc: "Guests can send messages, wishes, and mark attendance directly in the invite.",
  },
  {
    icon: "🎵",
    title: "Background Music",
    desc: "Romantic instrumental background music plays when guests open the invitation.",
  },
  {
    icon: "📍",
    title: "Venue with Maps",
    desc: "Google Maps embedded so guests can find the venue with one tap.",
  },
  {
    icon: "✨",
    title: "Premium Animations",
    desc: "Stunning 3D door reveals, flowing curtain openings, and particle effects.",
  },
  {
    icon: "📷",
    title: "Custom Image Upload",
    desc: "Upload your couple photos for a beautiful auto-playing slideshow gallery.",
  },
  {
    icon: "🎨",
    title: "Full Customization",
    desc: "Toggle sections on/off, choose colors, fonts, and make it truly yours.",
  },
];

export function PremiumFeatures() {
  return (
    <section className="bg-[#F5EFE6] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#B8860B] text-sm font-semibold tracking-widest uppercase"
        >
          உங்களுக்கு தேவையான அனைத்தும்
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e] gold-underline"
        >
          Premium Features
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-[#6a6a8a] text-base max-w-xl mx-auto"
        >
          ஒவ்வொரு feature-ம் உங்கள் திருமணத்தை இன்னும் சிறப்பாக மாற்ற வடிவமைக்கப்பட்டுள்ளது
        </motion.p>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="feature-card bg-white border border-[#E8E0D4] rounded-2xl p-6 text-left"
            >
              <div className="text-3xl mb-4">{feat.icon}</div>
              <h3 className="font-semibold text-[#1a1a2e] text-base mb-2 leading-snug">
                {feat.title}
              </h3>
              <p className="text-[#6a6a8a] text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    icon: "⊞",
    title: "Template தேர்வு செய்யுங்கள்",
    desc: "6 premium unique designs browse செய்யுங்கள்",
  },
  {
    num: "02",
    icon: "✓",
    title: "கட்டணம் செய்யுங்கள்",
    desc: "பாதுகாப்பான one-time payment, subscription இல்லை",
  },
  {
    num: "03",
    icon: "✏",
    title: "எளிய Form பூர்த்தி செய்யுங்கள்",
    desc: "பெயர்கள், இடம், தேதி என்று enter செய்யுங்கள்",
  },
  {
    num: "04",
    icon: "↗",
    title: "Link Share செய்யுங்கள்",
    desc: "Unique invitation link பெற்று எங்கும் share செய்யுங்கள்",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[#B8860B] text-sm font-semibold tracking-widest uppercase"
        >
          எளிய முறை
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e] gold-underline"
        >
          எப்படி செயல்படுகிறது
        </motion.h2>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon box */}
              <div className="w-16 h-16 rounded-2xl bg-[#FDF3DC] border border-[#B8860B]/20 flex items-center justify-center text-[#B8860B] text-2xl font-bold shadow-sm group-hover:bg-[#B8860B] group-hover:text-white transition-colors duration-300">
                {step.icon}
              </div>

              {/* Step number */}
              <span className="mt-3 text-xs font-bold text-[#B8860B]/60 tracking-widest">
                {step.num}
              </span>

              {/* Title */}
              <h3 className="mt-2 font-semibold text-[#1a1a2e] text-base leading-snug">
                {step.title}
              </h3>

              {/* Desc */}
              <p className="mt-2 text-[#6a6a8a] text-sm leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

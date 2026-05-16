"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    stars: 5,
    text: "மிகவும் அழகான design! எங்கள் விருந்தினர்கள் மிகவும் பாராட்டினார்கள்.",
    names: "பிரியா & அர்ஜுன்",
  },
  {
    stars: 5,
    text: "Scratch card feature எங்கள் நண்பர்களிடம் மிகவும் பிரபலமானது.",
    names: "அனன்யா & விக்ரம்",
  },
  {
    stars: 5,
    text: "Paper invitation-ஐ விட மிகவும் சிறந்தது. Highly recommend!",
    names: "சாரா & மைக்கேல்",
  },
  {
    stars: 5,
    text: "இசை feature மிகவும் romantic-ஆக இருந்தது. எல்லாரும் கேட்டார்கள்.",
    names: "கவிதா & ராஜேஷ்",
  },
  {
    stars: 5,
    text: "Setup மிகவும் எளிதாக இருந்தது. Worth every rupee!",
    names: "மீனா & சுரேஷ்",
  },
];

export function Testimonials() {
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
          தம்பதியர் மற்றும் வாடிக்கையாளர்கள் கூறுவது
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e]"
        >
          என்ன சொல்கிறார்கள்?
        </motion.h2>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.names}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="testimonial-card bg-white rounded-2xl p-6 text-left shadow-sm border border-[#E8E0D4]"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: review.stars }).map((_, si) => (
                  <span key={si} className="text-[#B8860B] text-lg">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#4a4a6a] text-sm leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Names */}
              <p className="text-[#1a1a2e] font-semibold text-sm">— {review.names}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

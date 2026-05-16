"use client";

import { motion } from "framer-motion";

const rows = [
  { feature: "Cost", paper: "₹5,000–₹50,000+", digital: "₹1000 one-time", digital_gold: true },
  { feature: "Delivery", paper: "2–4 weeks", digital: "Instant", digital_gold: true },
  { feature: "Interactive Features", paper: false, digital: true },
  { feature: "Messaging & Inbox", paper: false, digital: true },
  { feature: "Edit After Sending", paper: false, digital: true },
  { feature: "Background Music", paper: false, digital: true },
  { feature: "Google Maps", paper: false, digital: true },
  { feature: "Eco-Friendly", paper: false, digital: true },
  { feature: "Share via Link", paper: false, digital: true },
];

function Cell({ value, gold }: { value: string | boolean; gold?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <span className="text-emerald-500 font-bold text-lg">✓</span>
    ) : (
      <span className="text-red-400 font-bold text-lg">✗</span>
    );
  }
  return (
    <span className={gold ? "text-[#B8860B] font-semibold" : "text-[#4a4a6a]"}>
      {value}
    </span>
  );
}

export function ComparisonTable() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[#B8860B] text-sm font-semibold tracking-widest uppercase"
        >
          ஏன் Digital?
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-2 font-display text-3xl sm:text-4xl font-bold text-[#1a1a2e] text-center gold-underline"
        >
          Paper vs Digital அழைப்பிதழ்
        </motion.h2>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 rounded-2xl overflow-hidden border border-[#E8E0D4] shadow-sm"
        >
          <table className="comparison-table w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a2e] text-white">
                <th className="py-4 px-6 text-left font-semibold">Feature</th>
                <th className="py-4 px-6 text-center font-semibold">Paper</th>
                <th className="py-4 px-6 text-center font-semibold">
                  <span className="text-[#D4AF37]">Digital (வந்தனம்)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}>
                  <td className="py-3.5 px-6 font-medium text-[#1a1a2e]">{row.feature}</td>
                  <td className="py-3.5 px-6 text-center">
                    <Cell value={row.paper} />
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <Cell value={row.digital} gold={row.digital_gold} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

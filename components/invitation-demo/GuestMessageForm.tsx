"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { InvitationTheme, InvitationRenderData } from "@/types";

export function GuestMessageForm({ theme, invitation }: { theme?: InvitationTheme, invitation?: InvitationRenderData }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    attending: "yes",
    count: "2",
    message: "",
  });

  const defaultTheme: InvitationTheme = {
    background: "#ffffff",
    namesColor: "#B76E79",
    textColor: "#1a1a2e",
    accentColor: "#B76E79",
    dividerColor: "#E8E0D4",
    countdownBg: "#FAF7F2",
    buttonBg: "linear-gradient(135deg, #B76E79, #d4959e)"
  };

  const currentTheme = theme || defaultTheme;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-xl border px-4 py-3 text-sm focus:outline-none transition-all";

  return (
    <section className="py-16 px-4" style={{ backgroundColor: currentTheme.sectionBg || currentTheme.background }}>
      <div className="max-w-lg mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl sm:text-3xl font-bold text-center mb-2"
          style={{ color: currentTheme.namesColor }}
        >
          உங்கள் வாழ்த்துகள்
        </motion.h2>
        <p className="text-center text-sm mb-8 opacity-80" style={{ color: currentTheme.textColor }}>
          வருகின்றீர்களா? உங்கள் வாழ்த்தை அனுப்புங்கள்!
        </p>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12 rounded-2xl border shadow-xl"
            style={{ 
              backgroundColor: currentTheme.alternateBg || `${currentTheme.accentColor}11`, 
              borderColor: invitation?.templateId === 'garden-romance' ? 'rgba(255,255,255,0.15)' : `${currentTheme.accentColor}33`, 
              backdropFilter: invitation?.templateId === 'garden-romance' ? 'blur(10px)' : 'blur(8px)' 
            }}
          >
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="font-display text-xl font-bold mb-2" style={{ color: currentTheme.accentColor }}>
              நன்றி, {form.name}!
            </h3>
            <p className="text-sm opacity-90" style={{ color: currentTheme.textColor }}>
              உங்கள் வாழ்த்துகள் அனுப்பப்பட்டது. திருமணத்திற்கு வரவேற்கிறோம்! 💕
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4 border rounded-2xl p-6 shadow-2xl"
            style={{ 
              backgroundColor: invitation?.templateId === 'mughal-emerald' ? 'rgba(13,35,24,0.8)' : (currentTheme.alternateBg || "rgba(0,0,0,0.1)"), 
              borderColor: invitation?.templateId === 'mughal-emerald' ? 'rgba(200,169,81,0.3)' : (invitation?.templateId === 'garden-romance' ? 'rgba(255,255,255,0.15)' : `${currentTheme.accentColor}33`), 
              backdropFilter: (invitation?.templateId === 'garden-romance' || invitation?.templateId === 'mughal-emerald') ? 'blur(10px)' : 'blur(8px)' 
            }}
          >
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide opacity-90" style={{ color: currentTheme.textColor }}>
                உங்கள் பெயர் *
              </label>
              <input
                type="text"
                required
                placeholder="பெயர் உள்ளிடவும்"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
              />
            </div>

            {/* Attending */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide opacity-90" style={{ color: currentTheme.textColor }}>
                வருகிறீர்களா?
              </label>
              <select
                value={form.attending}
                onChange={(e) => setForm({ ...form, attending: e.target.value })}
                className={inputClass}
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
              >
                <option value="yes" className="text-black">ஆம், வருவோம்! 🎉</option>
                <option value="no" className="text-black">இல்லை, வர இயலாது 😔</option>
                <option value="maybe" className="text-black">ஒருவேளை வரலாம்</option>
              </select>
            </div>

            {/* Count */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide opacity-90" style={{ color: currentTheme.textColor }}>
                எத்தனை பேர் வருவீர்கள்?
              </label>
              <select
                value={form.count}
                onChange={(e) => setForm({ ...form, count: e.target.value })}
                className={inputClass}
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
              >
                {["1", "2", "3", "4", "5+"].map((n) => (
                  <option key={n} value={n} className="text-black">{n} பேர்</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wide opacity-90" style={{ color: currentTheme.textColor }}>
                வாழ்த்துகள்
              </label>
              <textarea
                rows={3}
                placeholder="உங்கள் இனிய வாழ்த்துகளை இங்கே எழுதுங்கள்..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass + " resize-none"}
                style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)", color: "white" }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-semibold text-base shadow-gold transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ 
                background: currentTheme.buttonBg || currentTheme.accentColor, 
                color: "white" 
              }}
            >
              வாழ்த்து அனுப்பு 💌
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}

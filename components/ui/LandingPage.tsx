"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, MapPinned, MessageCircleHeart, Music4, Palette, Sparkles } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TemplateCard } from "@/components/ui/TemplateCard";
import { APP_NAME, templateCatalog, testimonials } from "@/data/templates";

const features = [
  {
    icon: Sparkles,
    title: "Premium Templates",
    text: "6 அழகான திருமண அழைப்பிதழ் templates உடன் cinematic opening அனுபவம்.",
  },
  {
    icon: Palette,
    title: "தமிழ் Typography",
    text: "Catamaran font மூலம் அனைத்து தமிழ் உள்ளடக்கமும் தெளிவாக அழகாக காட்சியளிக்கும்.",
  },
  {
    icon: Music4,
    title: "Interactive அனுபவம்",
    text: "Countdown, scratch reveal, gallery, map, இசை, WhatsApp share அனைத்தும் உடன்.",
  },
  {
    icon: MessageCircleHeart,
    title: "Guest Inbox",
    text: "விருந்தினர்களின் வாழ்த்துகள் மற்றும் RSVP பதில்களை dashboard-ல் உடனுக்குடன் பார்க்கலாம்.",
  },
  {
    icon: MapPinned,
    title: "Map & வழிகாட்டி",
    text: "Google Maps embed மற்றும் வழிகாட்டி திற வசதி மூலம் சுலபமான வழிநடத்தல்.",
  },
  {
    icon: Heart,
    title: "Lifetime Access",
    text: "ஒருமுறை ₹1000 கட்டணம். subscription இல்லை, renewal இல்லை.",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0 },
};

export function LandingPage() {
  return (
    <main className="overflow-hidden">
      <section className="relative px-4 pb-24 pt-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(183,110,121,0.35),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(212,175,55,0.22),transparent_30%),linear-gradient(180deg,#0f102c_0%,#150f38_52%,#120f2a_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="space-y-8 text-white">
            <span className="inline-flex rounded-full border border-brand.gold/40 bg-brand.gold/10 px-4 py-2 text-sm text-brand.gold shadow-lg shadow-brand.gold/10">
              டிஜிட்டல் திருமண அழைப்பிதழ் உருவாக்குங்கள்
            </span>

            <div className="space-y-5">
              <p className="font-display text-lg text-brand.blush">Digital Tamil Wedding Invitations</p>
              <h1 className="font-tamil text-5xl leading-tight sm:text-6xl">
                <span className="bg-gradient-to-r from-white via-brand.blush to-brand.gold bg-clip-text text-transparent animate-pulse">
                  வந்தனம் மூலம் உங்கள் திருமண அழைப்பிதழை உருவாக்குங்கள்
                </span>
              </h1>
              <p className="max-w-2xl text-lg text-white/75">
                {APP_NAME} மூலம் 6 premium templates, cinematic reveal effects, countdown timer, scratch reveal,
                gallery, guest messages, map மற்றும் WhatsApp sharing அனைத்தையும் ஒரே இடத்தில் பெறுங்கள்.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-full bg-gradient-to-r from-brand.rose to-brand.gold px-7 py-3 font-semibold text-black shadow-xl shadow-brand.rose/25 transition hover:scale-105"
              >
                இப்போதே தொடங்கு
              </Link>
              <Link
                href="#templates"
                className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Templates பார்க்க
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {templateCatalog.slice(0, 4).map((template, idx) => (
              <motion.div
                key={template.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="rounded-[26px] border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/25 backdrop-blur"
              >
                <div className={`h-32 rounded-[18px] bg-gradient-to-br ${template.preview}`} />
                <p className="mt-3 font-tamil text-xl text-white">{template.name}</p>
                <p className="text-xs text-white/70">{idx + 1} / 6 Premium Theme</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        id="templates"
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.65 }}
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionTitle
          eyebrow="Templates"
          title="6 அழகான premium திருமண templates"
          description="ஒவ்வொரு template-க்கும் Live Demo உடன் தேர்வு செய்வது இன்னும் எளிது."
        />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {templateCatalog.map((template) => (
            <TemplateCard key={template.id} template={template} ctaHref="/create" />
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65 }}
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionTitle eyebrow="Features" title="Premium அனுபவத்தை தரும் அம்சங்கள்" />
        <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 240, damping: 20 }}
                className="rounded-[28px] border border-white/10 bg-white/5 p-7 text-white shadow-xl shadow-black/20"
              >
                <Icon className="h-10 w-10 text-brand.gold" />
                <h3 className="mt-5 font-display text-2xl">{feature.title}</h3>
                <p className="mt-3 text-white/75">{feature.text}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionTitle eyebrow="Pricing" title="ஒரே திட்டம். முழு access." />
        <div className="mx-auto mt-12 max-w-4xl rounded-[38px] border border-brand.gold/60 bg-gradient-to-br from-brand.rose/15 via-[#ffffff08] to-brand.gold/20 p-8 text-white shadow-[0_0_60px_rgba(212,175,55,0.28)] sm:p-10">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-display text-xl text-brand.blush">Lifetime Plan</p>
              <h3 className="mt-3 text-5xl font-semibold">₹1000</h3>
              <p className="mt-3 text-white/75">One-time payment. No subscription. No renewal.</p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex rounded-full bg-brand.gold px-6 py-3 font-semibold text-black transition hover:scale-105"
              >
                இப்போதே வாங்கு
              </Link>
            </div>
            <ul className="grid gap-3 text-white/85 sm:grid-cols-2">
              {[
                "All 6 templates unlocked",
                "Create up to 3 invitation webpages",
                "Unlimited guest views",
                "Edit invitation anytime",
                "Guest messaging inbox",
                "WhatsApp share link",
                "Countdown + scratch card",
                "Lifetime access",
              ].map((item) => (
                <li key={item} className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65 }}
        className="px-4 py-20 sm:px-6 lg:px-8"
      >
        <SectionTitle eyebrow="Testimonials" title="மணமக்கள் சொல்வது" />
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white">
              <p className="text-lg leading-8 text-white/80">“{item.text}”</p>
              <p className="mt-6 font-tamil text-2xl text-brand.blush">{item.name}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  );
}

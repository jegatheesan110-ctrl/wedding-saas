import { TamilTemplateId } from "@/types";

export const APP_NAME = process.env.APP_NAME || "வந்தனம்";
export const PLAN_AMOUNT = 100000;

export const musicOptions = [
  { id: "veenai", label: "வீணை மெட்டு", url: "https://cdn.pixabay.com/download/audio/2023/02/10/audio_bddf2a3ceb.mp3?filename=beautiful-piano-ambient-144998.mp3" },
  { id: "nadaswaram", label: "நாதஸ்வரம்", url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_4f29b865c8.mp3?filename=wedding-110784.mp3" },
  { id: "flute", label: "குழல் இசை", url: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_8f58df93f5.mp3?filename=romantic-background-124231.mp3" },
  { id: "soft-strings", label: "மென்மையான ஸ்ட்ரிங்ஸ்", url: "https://cdn.pixabay.com/download/audio/2022/11/24/audio_e34e8a4e64.mp3?filename=romantic-background-piano-126862.mp3" },
  { id: "instrumental", label: "இனிமையான இசை", url: "https://cdn.pixabay.com/download/audio/2023/02/02/audio_0d1a4c6b2e.mp3?filename=romantic-love-143832.mp3" },
] as const;

export const templateCatalog: Array<{
  id: TamilTemplateId;
  name: string;
  englishName: string;
  colors: string[];
  description: string;
  preview: string;
  animation: string;
}> = [
  { id: "royal-elegance", name: "ராயல் எலிகன்ஸ்", englishName: "Royal Elegance", colors: ["#D4AF37", "#FFFDD0", "#800020"], description: "பொன் மினுமினுப்பு, மரியாதையான திரை திறப்பு, ராஜ கம்பீரம்.", preview: "from-[#800020] via-[#D4AF37] to-[#FFFDD0]", animation: "Royal curtain reveal" },
  { id: "garden-romance", name: "கார்டன் ரொமான்ஸ்", englishName: "Garden Romance", colors: ["#B2AC88", "#FFB6C1", "#FFFFFF"], description: "மலர் இதழ்கள் விழும் மென்மையான தோட்ட உணர்வு.", preview: "from-[#B2AC88] via-[#FFB6C1] to-[#FFFFFF]", animation: "Falling petals fade-in" },
  { id: "modern-minimal", name: "மாடர்ன் மினிமல்", englishName: "Modern Minimal", colors: ["#000000", "#FFFFFF", "#D4AF37"], description: "சுத்தமான வரிகள், பெரிய தமிழ் எழுத்து, எளிய செழிப்பு.", preview: "from-black via-zinc-900 to-[#D4AF37]", animation: "Slide-up with fade" },
  { id: "mughal-emerald", name: "முகல் எமரால்ட்", englishName: "Mughal Emerald", colors: ["#50C878", "#D4AF37", "#FFFFF0"], description: "அரண்மனை வளைவு, அலங்கார ஓரம், செழுமையான நிகழ்வு.", preview: "from-[#50C878] via-[#D4AF37] to-[#FFFFF0]", animation: "Mughal arch opening" },
  { id: "rose-gold-blush", name: "ரோஸ் கோல்ட் ப்ளஷ்", englishName: "Rose Gold Blush", colors: ["#B76E79", "#F4C2C2", "#FFFFF0"], description: "மென்மையான ரோஸ் கோல்ட் தோற்றம் மற்றும் இரட்டை கதவு திறப்பு.", preview: "from-[#B76E79] via-[#F4C2C2] to-[#FFFFF0]", animation: "3D double door reveal" },
  { id: "midnight-royal", name: "மிட்நைட் ராயல்", englishName: "Midnight Royal", colors: ["#0A1045", "#D4AF37", "#C0C0C0"], description: "நட்சத்திர வானம், இருண்ட பிரமாண்டம், பொன் தமிழ் எழுத்து.", preview: "from-[#0A1045] via-[#111c75] to-[#D4AF37]", animation: "Starfield rise-up" },
];

export const testimonials = [
  { name: "கிருஷ்ணா & தீபிகா", text: "எங்கள் குடும்பத்துக்கு மிக எளிதாக பகிர முடிந்த அழகான தமிழ் அழைப்பிதழ் இது." },
  { name: "அஜய் & ஹேமா", text: "Count down, map, guest wishes எல்லாம் ஒரே link-ல் கிடைத்தது மிகவும் உதவியது." },
  { name: "அருண் & காவ்யா", text: "WhatsApp share செய்தவுடன் எல்லோரும் மிகவும் பாராட்டினர்." },
] as const;

"use client";

import { useState } from "react";

export function GuestMessageForm({ slug, theme }: { slug: string; theme?: any }) {
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(formData: FormData) {
    const res = await fetch("/api/messages/submit", { 
      method: "POST", 
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ 
        slug, 
        guestName: String(formData.get("guestName") || ""), 
        attendance: String(formData.get("attendance") || ""), 
        guestCount: Number(formData.get("guestCount") || 1), 
        message: String(formData.get("message") || "") 
      }) 
    });
    setStatusMessage(res.ok ? "உங்கள் வாழ்த்துகள் பதிவு செய்யப்பட்டது" : "சேமிக்க முடியவில்லை");
  }

  const accentColor = theme?.accent?.replace("text-", "") || "#B76E79";
  const textColor = theme?.text?.replace("text-", "") || "#1a1a2e";
  const resolvedAccent = accentColor.startsWith('[#') ? accentColor.slice(1, -1) : accentColor;
  const resolvedText = textColor.startsWith('[#') ? textColor.slice(1, -1) : textColor;

  return (
    <form action={handleSubmit} className={`space-y-4 rounded-[32px] border border-white/10 ${theme?.card || "bg-white/80"} p-6 shadow-xl`}>
      <h3 className="font-tamil text-3xl" style={{ color: resolvedText }}>உங்கள் வாழ்த்துகளை பகிருங்கள்</h3>
      
      <input 
        name="guestName" 
        placeholder="உங்கள் பெயர்" 
        className="w-full rounded-2xl border border-black/5 px-4 py-3 bg-white/50" 
        style={{ color: resolvedText }}
        required 
      />
      
      <div className="space-y-2" style={{ color: resolvedText }}>
        <p className="opacity-70">நீங்கள் வருகிறீர்களா?</p>
        {["வருகிறேன்", "வர இயலவில்லை", "யோசிக்கிறேன்"].map((option) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="attendance" 
              value={option} 
              defaultChecked={option === "வருகிறேன்"} 
              className="accent-current"
              style={{ color: resolvedAccent }}
            />
            {option}
          </label>
        ))}
      </div>
      
      <input 
        name="guestCount" 
        type="number" 
        min={1} 
        defaultValue={1} 
        placeholder="எத்தனை பேர் வருகிறீர்கள்?" 
        className="w-full rounded-2xl border border-black/5 px-4 py-3 bg-white/50" 
        style={{ color: resolvedText }}
        required 
      />
      
      <textarea 
        name="message" 
        placeholder="உங்கள் வாழ்த்துகள்" 
        className="min-h-28 w-full rounded-2xl border border-black/5 px-4 py-3 bg-white/50" 
        style={{ color: resolvedText }}
      />
      
      {statusMessage ? <p className="text-sm font-medium" style={{ color: resolvedAccent }}>{statusMessage}</p> : null}
      
      <button 
        className="rounded-full px-8 py-3.5 font-semibold text-white transition-all hover:opacity-90 shadow-lg"
        style={{ backgroundColor: resolvedAccent }}
      >
        அனுப்பு
      </button>
    </form>
  );
}

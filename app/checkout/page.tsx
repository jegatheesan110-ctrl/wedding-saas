"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { ImageUploadField } from "@/components/ui/ImageUploadField";
import { FastPhotoUpload } from "@/components/ui/FastPhotoUpload";
import { CheckCircle2, CreditCard, Heart, MapPin, Users, Phone, Mail, Calendar, Clock } from "lucide-react";
import { AdminHeader } from "@/components/ui/AdminHeader";

const RAZORPAY_KEY = "rzp_test_Si8gMgFDsNCx4P";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get("template") || "royal-elegance";

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    templateId,
    brideName: "",
    groomName: "",
    weddingDate: "",
    weddingTime: "",
    weddingVenue: "",
    familyNames: "",
    photoUrl: "", // keeping for backward compat if needed
    photo1: null as string | null,
    photo2: null as string | null,
    photo3: null as string | null,
    photo4: null as string | null,
    contactNumber: "",
    email: "",
  });

  const [mapUrl, setMapUrl] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [generatedSlug, setGeneratedSlug] = useState('')
  const [cardGenerated, setCardGenerated] = useState(false)

  const handleVenueSearch = () => {
    if (venueAddress) {
      const encoded = encodeURIComponent(venueAddress)
      setMapUrl(
        `https://maps.google.com/maps?q=${encoded}&output=embed&z=15`
      )
      setShowMap(true)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          weddingVenue: venueAddress,
          mapLink: venueAddress ? `https://maps.google.com/?q=${encodeURIComponent(venueAddress)}` : undefined
        }),
      });

      const data = await res.json();
      if (res.ok && data.slug) {
        setGeneratedSlug(data.slug);
        setCardGenerated(true);
      } else {
        alert(data.error || "அழைப்பிதழ் உருவாக்க முடியவில்லை");
      }
    } catch (err) {
      console.error(err);
      alert("ஏதோ தவறு நடந்துவிட்டது");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      <AdminHeader />
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Heart className="h-10 w-10 text-[#D4AF37] mx-auto mb-4" />
          <h1 className="font-tamil text-3xl sm:text-4xl font-bold text-gray-900">
            விவரங்களை நிரப்பவும்
          </h1>
          <p className="mt-2 text-gray-600">
            உங்கள் அழைப்பிதழில் இடம்பெற வேண்டிய விவரங்களைச் சேர்க்கவும்
          </p>
        </div>

        <div id="form-section" className="bg-white rounded-[24px] shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bride Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  மணமகள் பெயர் (Bride Name)
                </label>
                <input
                  required
                  value={form.brideName}
                  onChange={(e) => setForm({ ...form, brideName: e.target.value })}
                  placeholder="உதாரணம்: அங்கயற்கண்ணி"
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                />
              </div>

              {/* Groom Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-blue-500" />
                  மணமகன் பெயர் (Groom Name)
                </label>
                <input
                  required
                  value={form.groomName}
                  onChange={(e) => setForm({ ...form, groomName: e.target.value })}
                  placeholder="உதாரணம்: சுந்தரேஸ்வரர்"
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                />
              </div>

              {/* Wedding Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#D4AF37]" />
                  திருமண தேதி (Wedding Date)
                </label>
                <input
                  required
                  type="date"
                  value={form.weddingDate}
                  onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                />
              </div>

              {/* Wedding Time */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#D4AF37]" />
                  திருமண நேரம் (Wedding Time)
                </label>
                <input
                  required
                  type="time"
                  value={form.weddingTime}
                  onChange={(e) => setForm({ ...form, weddingTime: e.target.value })}
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  தொடர்பு எண் (Contact Number)
                </label>
                <input
                  required
                  type="tel"
                  value={form.contactNumber}
                  onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                  placeholder="9876543210"
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Wedding Venue */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
                fontWeight: '600'
              }}>
                📍 திருமண இடம் (Wedding Venue)
              </label>

              {/* Address search input */}
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '10px'
              }}>
                <input
                  type="text"
                  placeholder="இடத்தின் பெயர் அல்லது முகவரி உள்ளிடவும்"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleVenueSearch();
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    fontSize: '14px'
                  }}
                />
                <button
                  type="button"
                  onClick={handleVenueSearch}
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#000',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  🔍 தேடு
                </button>
              </div>

              {/* Map display */}
              {showMap && mapUrl && (
                <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="250"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                  />
                  <div style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #86efac',
                    borderRadius: '0 0 12px 12px',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '13px',
                    color: '#166534'
                  }}>
                    ✅ இடம் குறிக்கப்பட்டது: {venueAddress}
                  </div>
                </div>
              )}

              {/* Open in Google Maps button */}
              {venueAddress && (
                <button
                  type="button"
                  onClick={() => window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(venueAddress)}`,
                    '_blank'
                  )}
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: '1px solid #d4af37',
                    color: '#d4af37',
                    padding: '10px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  🗺️ Google Maps-ல் பார்க்க
                </button>
              )}
            </div>

            {/* Family Names */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4 text-orange-500" />
                குடும்பப் பெயர்கள் (Family Names)
              </label>
              <textarea
                required
                value={form.familyNames}
                onChange={(e) => setForm({ ...form, familyNames: e.target.value })}
                placeholder="உதாரணம்: திரு. ராமநாதன் & திருமதி. சரஸ்வதி குடும்பத்தினர்"
                rows={2}
                className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                மின்னஞ்சல் (Email)
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="yourname@example.com"
                className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            {/* Photo Upload */}
            <div className="pt-4">
              <FastPhotoUpload
                photos={[form.photo1, form.photo2, form.photo3, form.photo4]}
                onChange={(idx, url) => {
                  const key = `photo${idx + 1}` as keyof typeof form;
                  setForm({ ...form, [key]: url });
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a2e] hover:bg-[#D4AF37] text-white font-bold py-4 rounded-[16px] transition-all duration-300 disabled:opacity-50 shadow-lg mt-8"
            >
              {loading ? "சேமிக்கப்படுகிறது..." : "அழைப்பிதழை உருவாக்கு (Generate Card)"}
            </button>
          </form>

          {cardGenerated && (
            <div style={{
              marginTop: '20px',
              padding: '20px',
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '12px'
            }}>
              <p style={{
                color: '#166534',
                fontWeight: 'bold',
                marginBottom: '12px',
                fontSize: '16px'
              }}>
                ✅ அழைப்பிதழ் தயார்!
              </p>
              
              <p style={{
                color: '#555',
                fontSize: '13px',
                marginBottom: '8px'
              }}>
                Share Link:
              </p>
              
              <div style={{
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '10px',
                fontSize: '13px',
                color: '#333',
                wordBreak: 'break-all',
                marginBottom: '12px'
              }}>
                {window.location.origin}/invitation/{generatedSlug}
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.origin + 
                      '/invitation/' + generatedSlug
                    )
                    alert('Link copied!')
                  }}
                  style={{
                    backgroundColor: '#d4af37',
                    color: '#000',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📋 Link Copy செய்
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const url = window.location.origin + 
                      '/invitation/' + generatedSlug
                    const msg = 'திருமண அழைப்பிதழ் 💌\n' + url
                    window.open(
                      'https://wa.me/?text=' + 
                      encodeURIComponent(msg),
                      '_blank'
                    )
                  }}
                  style={{
                    backgroundColor: '#25D366',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  💚 WhatsApp Share
                </button>

                <button
                  type="button"
                  onClick={() => window.open(
                    '/invitation/' + generatedSlug, 
                    '_blank'
                  )}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#d4af37',
                    border: '2px solid #d4af37',
                    borderRadius: '10px',
                    padding: '12px',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  👁️ Card பார்க்க
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

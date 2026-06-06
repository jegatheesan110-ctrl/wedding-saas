"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  Heart, MapPin, Users, Mail, Calendar, Clock,
  Phone, CheckCircle2, Copy, Share2, Eye,
  CreditCard, Lock, ChevronRight
} from "lucide-react";
import { AdminHeader } from "@/components/ui/AdminHeader";
import { FastPhotoUpload } from "@/components/ui/FastPhotoUpload";

/* ─── Template display names ─── */
const TEMPLATE_NAMES: Record<string, string> = {
  "royal-elegance":  "ராயல் எலிகன்ஸ் (Royal Elegance)",
  "garden-romance":  "கார்டன் ரொமான்ஸ் (Garden Romance)",
  "modern-minimal":  "மாடர்ன் மினிமல் (Modern Minimal)",
  "mughal-emerald":  "முகல் எமரால்ட் (Mughal Emerald)",
  "rose-gold-blush": "ரோஸ் கோல்ட் ப்ளஷ் (Rose Gold Blush)",
  "midnight-royal":  "மிட்நைட் ராயல் (Midnight Royal)",
};

/* ─── Step indicator ─── */
function StepBadge({ step, current }: { step: number; current: number }) {
  const done = current > step;
  const active = current === step;
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all
          ${done ? "bg-green-500 text-white" : active ? "bg-[#D4AF37] text-black" : "bg-gray-200 text-gray-400"}`}
      >
        {done ? "✓" : step}
      </div>
      <span className={`text-[10px] font-semibold uppercase tracking-wider ${active ? "text-[#D4AF37]" : "text-gray-400"}`}>
        {step === 1 ? "Payment" : step === 2 ? "Details" : "Done"}
      </span>
    </div>
  );
}

/* ─── Main content ─── */
function IndividualCheckoutContent() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "royal-elegance";
  const templateName = TEMPLATE_NAMES[templateId] ?? templateId;

  // step: 1 = payment, 2 = form, 3 = success
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  // Saved after payment success – used as proof when generating the card
  const [verifiedOrderId, setVerifiedOrderId] = useState<string | null>(null);
  const [verifiedEmail, setVerifiedEmail] = useState<string>("");

  // Form state
  const [form, setForm] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    weddingTime: "",
    weddingVenue: "",
    familyNames: "",
    email: "",
    contactNumber: "",
    photo1: null as string | null,
    photo2: null as string | null,
    photo3: null as string | null,
    photo4: null as string | null,
  });
  const [formLoading, setFormLoading] = useState(false);

  // Step 3 result
  const [generatedSlug, setGeneratedSlug] = useState("");

  /* ── STEP 1: Initiate Razorpay payment ── */
  const handlePayment = async () => {
    setLoading(true);
    setPaymentError("");

    try {
      // We need at least an email to create the order
      const emailInput = (document.getElementById("pay-email") as HTMLInputElement)?.value?.trim();
      if (!emailInput || !emailInput.includes("@")) {
        setPaymentError("கட்டணம் செலுத்துவதற்கு முன் உங்கள் மின்னஞ்சலை உள்ளிடவும்.");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/individual/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailInput }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.order) {
        setPaymentError(orderData.error || "Order creation failed. Please try again.");
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "வந்தனம் (Vanthanam)",
        description: `${templateName} — Individual Invitation`,
        order_id: orderData.order.id,
        prefill: { email: emailInput },
        theme: { color: "#D4AF37" },
        handler: async function (response: any) {
          // Verify payment server-side
          const verifyRes = await fetch("/api/individual/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok && verifyData.success) {
            // Payment verified — unlock Step 2
            setVerifiedOrderId(response.razorpay_order_id);
            setVerifiedEmail(emailInput);
            setForm((f) => ({ ...f, email: emailInput }));
            setStep(2);
          } else {
            setPaymentError(verifyData.error || "Payment verification failed. Please contact support.");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setPaymentError("ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.");
      setLoading(false);
    }
  };

  /* ── STEP 2: Submit form → generate card ── */
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard: payment must be verified
    if (!verifiedOrderId) {
      alert("Payment not verified. Please complete payment first.");
      setStep(1);
      return;
    }

    setFormLoading(true);
    try {
      const res = await fetch("/api/individual/generate-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          templateId,
          razorpayOrderId: verifiedOrderId,
        }),
      });

      const data = await res.json();
      if (res.ok && data.slug) {
        setGeneratedSlug(data.slug);
        setStep(3);
      } else {
        alert(data.error || "அழைப்பிதழ் உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.");
      }
    } catch (err) {
      console.error(err);
      alert("ஏதோ தவறு நடந்துவிட்டது.");
    } finally {
      setFormLoading(false);
    }
  };

  const invitationUrl =
    typeof window !== "undefined" && generatedSlug
      ? `${window.location.origin}/invitation/${generatedSlug}`
      : "";

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <AdminHeader />

      <div className="max-w-2xl mx-auto py-10 px-4 sm:px-6">

        {/* ── Step indicator ── */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <StepBadge step={1} current={step} />
          <div className={`flex-1 h-0.5 max-w-[60px] ${step > 1 ? "bg-green-400" : "bg-gray-200"}`} />
          <StepBadge step={2} current={step} />
          <div className={`flex-1 h-0.5 max-w-[60px] ${step > 2 ? "bg-green-400" : "bg-gray-200"}`} />
          <StepBadge step={3} current={step} />
        </div>

        {/* ════════════════════════════════════════
            STEP 1 — PAYMENT
        ════════════════════════════════════════ */}
        {step === 1 && (
          <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1a1a2e] to-[#2a2a4e] px-8 py-7 text-center">
              <CreditCard className="h-10 w-10 text-[#D4AF37] mx-auto mb-3" />
              <h1 className="text-2xl font-bold text-white mb-1">கட்டணம் செலுத்தவும்</h1>
              <p className="text-white/60 text-sm">Pay to unlock your invitation form</p>
            </div>

            <div className="px-8 py-8 space-y-6">
              {/* Template summary */}
              <div className="bg-[#FAF7F2] rounded-[16px] p-5 border border-[#D4AF37]/20">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#D4AF37] mb-1">Selected Template</p>
                <p className="font-bold text-gray-900 text-lg">{templateName}</p>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-[16px] px-6 py-5">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Digital Invitation (Lifetime)</p>
                  <p className="text-xs text-gray-400 mt-0.5">One-time payment • No subscription</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-extrabold text-green-700">₹199</p>
                  <p className="text-xs text-green-600 line-through">₹999</p>
                </div>
              </div>

              {/* Email input */}
              <div className="space-y-2">
                <label htmlFor="pay-email" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  மின்னஞ்சல் (Email) <span className="text-red-500">*</span>
                </label>
                <input
                  id="pay-email"
                  type="email"
                  required
                  placeholder="yourname@example.com"
                  defaultValue={verifiedEmail}
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37] text-gray-900"
                />
                <p className="text-xs text-gray-400">Payment confirmation will be sent to this email.</p>
              </div>

              {/* Error */}
              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-[12px] px-4 py-3 text-red-700 text-sm">
                  ❌ {paymentError}
                </div>
              )}

              {/* Pay button */}
              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold py-4 rounded-[16px] transition-all duration-200 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <><span className="animate-spin">⏳</span> Processing...</>
                ) : (
                  <><CreditCard className="h-5 w-5" /> Pay ₹199 via Razorpay</>
                )}
              </button>

              {/* Lock notice */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock className="h-3.5 w-3.5" />
                <span>Secure payment. Form unlocks after payment success.</span>
              </div>

              {/* What's included */}
              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">What you get</p>
                <ul className="space-y-2">
                  {[
                    "Premium digital wedding invitation",
                    "Shareable link (WhatsApp, SMS, etc.)",
                    "Up to 4 couple photos",
                    "Lifetime access to your invitation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
            STEP 2 — INVITATION DETAILS FORM
        ════════════════════════════════════════ */}
        {step === 2 && (
          <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-center">
              <CheckCircle2 className="h-9 w-9 text-white mx-auto mb-2" />
              <h1 className="text-xl font-bold text-white">கட்டணம் வெற்றி! விவரங்களை நிரப்பவும்</h1>
              <p className="text-white/70 text-sm mt-1">Payment successful — fill your invitation details</p>
            </div>

            <form onSubmit={handleFormSubmit} className="px-8 py-8 space-y-6">

              {/* Email (pre-filled, locked) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  மின்னஞ்சல் (Email)
                </label>
                <input
                  type="email"
                  value={form.email}
                  readOnly
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bride Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-pink-500" />
                    மணமகள் பெயர் (Bride Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.brideName}
                    onChange={(e) => setForm({ ...form, brideName: e.target.value })}
                    placeholder="உதாரணம்: அங்கயற்கண்ணி"
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>

                {/* Groom Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Heart className="h-4 w-4 text-blue-500" />
                    மணமகன் பெயர் (Groom Name) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    value={form.groomName}
                    onChange={(e) => setForm({ ...form, groomName: e.target.value })}
                    placeholder="உதாரணம்: சுந்தரேஸ்வரர்"
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>

                {/* Wedding Date */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#D4AF37]" />
                    கல்யாண தேதி (Wedding Date) <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={form.weddingDate}
                    onChange={(e) => setForm({ ...form, weddingDate: e.target.value })}
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>

                {/* Wedding Time */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#D4AF37]" />
                    கல்யாண நேரம் (Wedding Time)
                  </label>
                  <input
                    type="time"
                    value={form.weddingTime}
                    onChange={(e) => setForm({ ...form, weddingTime: e.target.value })}
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>

                {/* Contact */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    தொடர்பு எண் (Contact Number)
                  </label>
                  <input
                    type="tel"
                    value={form.contactNumber}
                    onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
                    placeholder="9876543210"
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Venue */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-red-500" />
                  கல்யாண இடம் (Wedding Venue) <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.weddingVenue}
                  onChange={(e) => setForm({ ...form, weddingVenue: e.target.value })}
                  placeholder="உதாரணம்: மீனாட்சி அம்மன் கோவில், மதுரை"
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                />
              </div>

              {/* Family Names */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-500" />
                  குடும்பப் பெயர்கள் (Family Names)
                </label>
                <textarea
                  value={form.familyNames}
                  onChange={(e) => setForm({ ...form, familyNames: e.target.value })}
                  placeholder="உதாரணம்: திரு. ராமநாதன் & திருமதி. சரஸ்வதி குடும்பத்தினர்"
                  rows={2}
                  className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-[#D4AF37]"
                />
              </div>

              {/* Photos */}
              <div className="pt-2">
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
                disabled={formLoading}
                className="w-full bg-[#1a1a2e] hover:bg-[#D4AF37] text-white font-bold py-4 rounded-[16px] transition-all duration-300 disabled:opacity-50 shadow-lg flex items-center justify-center gap-2 text-base"
              >
                {formLoading ? (
                  <><span className="animate-spin">⏳</span> உருவாக்கப்படுகிறது...</>
                ) : (
                  <>அழைப்பிதழை உருவாக்கு <ChevronRight className="h-5 w-5" /></>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ════════════════════════════════════════
            STEP 3 — SUCCESS / RESULT
        ════════════════════════════════════════ */}
        {step === 3 && (
          <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#D4AF37] to-[#b5952f] px-8 py-8 text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">அழைப்பிதழ் தயார்! 🎉</h1>
              <p className="text-white/80 text-sm">Your invitation is live and ready to share</p>
            </div>

            <div className="px-8 py-8 space-y-5">
              {/* Link display */}
              <div className="bg-gray-50 rounded-[16px] p-5 border border-gray-200">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  உங்கள் Invitation Link
                </p>
                <p className="text-sm text-gray-800 break-all font-medium">{invitationUrl}</p>
              </div>

              {/* Action buttons */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(invitationUrl);
                  alert("Link copied!");
                }}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white font-bold py-3.5 rounded-[14px] hover:bg-gray-700 transition-colors"
              >
                <Copy className="h-5 w-5" /> Link Copy செய்
              </button>

              <button
                onClick={() => {
                  const msg = `திருமண அழைப்பிதழ் 💌\n${invitationUrl}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-[14px] hover:bg-[#1dba57] transition-colors"
              >
                <Share2 className="h-5 w-5" /> WhatsApp Share
              </button>

              <button
                onClick={() => window.open(invitationUrl, "_blank")}
                className="w-full flex items-center justify-center gap-2 border-2 border-[#D4AF37] text-[#D4AF37] font-bold py-3.5 rounded-[14px] hover:bg-[#D4AF37]/10 transition-colors"
              >
                <Eye className="h-5 w-5" /> Card பார்க்க
              </button>

              <p className="text-center text-xs text-gray-400 pt-2">
                இந்த link எப்போதும் valid ஆக இருக்கும். Bookmark செய்து வைத்துக்கொள்ளவும்.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function IndividualCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">Loading...</div>}>
      <IndividualCheckoutContent />
    </Suspense>
  );
}

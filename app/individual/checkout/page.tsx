"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Script from "next/script";
import { Heart, MapPin, Users, Mail, Calendar } from "lucide-react";
import { AdminHeader } from "@/components/ui/AdminHeader";
import { FastPhotoUpload } from "@/components/ui/FastPhotoUpload";

function IndividualCheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const templateId = searchParams.get("template") || "royal-elegance";

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    weddingVenue: "",
    familyNames: "",
    email: "",
    photo1: null as string | null,
    photo2: null as string | null,
    photo3: null as string | null,
    photo4: null as string | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/individual/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, templateId }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.order) {
        alert(orderData.error || "Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "வந்தனம் (Vanthanam)",
        description: "தனிப்பட்டவர் அழைப்பிதழ் (Individual Invitation)",
        order_id: orderData.order.id,
        prefill: { email: form.email },
        handler: async function (response: any) {
          const verifyRes = await fetch("/api/individual/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...response, form, templateId }),
          });

          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            router.push(`/individual/success?slug=${verifyData.slug}`);
          } else {
            alert(verifyData.error || "Payment verification failed");
            setLoading(false);
          }
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
      alert("ஏதோ தவறு நடந்துவிட்டது (Something went wrong)");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <AdminHeader />
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Heart className="h-10 w-10 text-[#D4AF37] mx-auto mb-4" />
          <h1 className="font-tamil text-3xl sm:text-4xl font-bold text-gray-900">
            விவரங்களை நிரப்பவும்
          </h1>
          <p className="mt-2 text-gray-600">
            வெறும் ₹199-ல் உங்கள் அழைப்பிதழை உருவாக்கவும்
          </p>
        </div>

        <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 p-8">
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
            </div>

            {/* Wedding Venue */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                திருமண இடம் (Wedding Venue)
              </label>
              <input
                required
                type="text"
                value={form.weddingVenue}
                onChange={(e) => setForm({ ...form, weddingVenue: e.target.value })}
                placeholder="உதாரணம்: மீனாட்சி அம்மன் கோவில், மதுரை"
                className="w-full rounded-[12px] border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
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
              className="w-full bg-[#1a1a2e] hover:bg-[#D4AF37] text-white font-bold py-4 rounded-[16px] transition-all duration-300 disabled:opacity-50 shadow-lg mt-8 flex justify-center items-center gap-2"
            >
              {loading ? "Processing..." : "Pay ₹199 via Razorpay"}
            </button>
          </form>
        </div>
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

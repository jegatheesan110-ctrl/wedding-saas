"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Copy, Share2, Eye, Camera } from "lucide-react";
import { FastPhotoUpload } from "@/components/ui/FastPhotoUpload";
import { AdminHeader } from "@/components/ui/AdminHeader";

function SuccessContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  
  const [photos, setPhotos] = useState<string[]>([null, null, null, null] as any);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      setInvitationUrl(`${window.location.origin}/invitation/${slug}`);
    }
  }, [slug]);

  if (!slug) {
    return <div className="p-8 text-center">Invalid invitation link.</div>;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationUrl);
    alert("Link copied!");
  };

  const handleWhatsApp = () => {
    const msg = `திருமண அழைப்பிதழ் 💌\n${invitationUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const handleSavePhotos = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/individual/update-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, photos }),
      });
      if (res.ok) {
        setSaved(true);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save photos");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while saving photos.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans">
      <AdminHeader />
      
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 p-8 text-center mb-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="font-tamil text-3xl font-bold text-gray-900 mb-2">
            வெற்றிகரமாக உருவாக்கப்பட்டது!
          </h1>
          <p className="text-gray-600 mb-6">
            உங்கள் கட்டணம் வெற்றிகரமாக பெறப்பட்டது. அழைப்பிதழ் Link உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டுள்ளது.
          </p>

          <div className="bg-gray-50 rounded-[16px] p-6 mb-8 border border-gray-200">
            <p className="text-sm text-gray-500 font-semibold mb-2 uppercase tracking-wider">Your Permanent Link</p>
            <div className="text-lg font-medium text-gray-900 break-all mb-6">
              {invitationUrl}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors"
              >
                <Copy className="h-5 w-5" /> Copy Link
              </button>
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors"
              >
                <Share2 className="h-5 w-5" /> WhatsApp Share
              </button>
              <button
                onClick={() => window.open(invitationUrl, "_blank")}
                className="flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#b5952f] transition-colors"
              >
                <Eye className="h-5 w-5" /> View Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}

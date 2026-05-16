import { MessageCircleMore } from "lucide-react";

export function WhatsAppButton({ url }: { url: string }) {
  const shareUrl = "https://wa.me/?text=" + encodeURIComponent("வந்தனம் மூலம் உருவாக்கப்பட்ட எங்கள் திருமண அழைப்பிதழை பாருங்கள்: " + url);
  return <a href={shareUrl} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 rounded-full bg-[#25D366] p-4 text-white shadow-xl"><MessageCircleMore className="h-5 w-5" /></a>;
}

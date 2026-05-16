"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";
import { Camera, X, Loader2, Image as ImageIcon } from "lucide-react";

type FastPhotoUploadProps = {
  photos: (string | null)[];
  onChange: (index: number, url: string | null) => void;
};

export function FastPhotoUpload({ photos, onChange }: FastPhotoUploadProps) {
  const [uploading, setUploading] = useState<number[]>([]); // Tracking which index is uploading
  const [progress, setProgress] = useState<Record<number, number>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (index: number, file: File) => {
    try {
      setUploading((prev) => [...prev, index]);
      setProgress((prev) => ({ ...prev, [index]: 10 }));

      // 1. Compress
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setProgress((prev) => ({ ...prev, [index]: 30 }));

      // 2. Upload
      const formData = new FormData();
      formData.append("file", compressedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setProgress((prev) => ({ ...prev, [index]: 100 }));
      onChange(index, data.url);
    } catch (err) {
      console.error(err);
      alert("Upload failed for Photo " + (index + 1));
    } finally {
      setUploading((prev) => prev.filter((i) => i !== index));
    }
  };

  const onFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(index, file);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Camera className="h-4 w-4 text-[#D4AF37]" />
        புகைப்படங்கள் (Upload 4 Photos)
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((idx) => (
          <div 
            key={idx}
            className="relative aspect-square rounded-[16px] border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center overflow-hidden hover:border-[#D4AF37] transition-colors cursor-pointer group"
            onClick={() => !uploading.includes(idx) && !photos[idx] && document.getElementById(`photo-input-${idx}`)?.click()}
          >
            {photos[idx] ? (
              <>
                <img src={photos[idx]!} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(idx, null);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : uploading.includes(idx) ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-6 w-6 text-[#D4AF37] animate-spin" />
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#D4AF37] transition-all duration-300"
                    style={{ width: `${progress[idx] || 0}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500">Uploading...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <ImageIcon className="h-6 w-6 text-gray-300 group-hover:text-[#D4AF37]" />
                <span className="text-xs text-gray-400 font-medium">Photo {idx + 1}</span>
              </div>
            )}
            
            <input
              id={`photo-input-${idx}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onFileChange(idx, e)}
            />
          </div>
        ))}
      </div>
      <p className="text-[11px] text-gray-400 text-center">
        Max 4 photos. Compressed automatically for fast loading.
      </p>
    </div>
  );
}

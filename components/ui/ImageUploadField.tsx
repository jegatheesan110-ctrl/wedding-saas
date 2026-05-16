"use client";

import { useRef, useState } from "react";

type ImageUploadFieldProps = {
  label: string;
  value?: string | null;
  onChange: (url: string) => void;
  multiple?: boolean;
  onMultipleChange?: (urls: string[]) => void;
};

export function ImageUploadField({ label, value, onChange, multiple, onMultipleChange }: ImageUploadFieldProps) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function uploadFiles(files: FileList | null) {
    if (!files?.length) return;
    setLoading(true);
    const uploaded: string[] = [];

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data.url) uploaded.push(data.url);
    }

    setLoading(false);
    if (multiple) return onMultipleChange?.(uploaded);
    if (uploaded[0]) onChange(uploaded[0]);
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <button type="button" onClick={() => inputRef.current?.click()} className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-brand.rose">{loading ? "Upload ஆகிறது..." : "படத்தை upload செய்"}</button>
      <input ref={inputRef} type="file" accept="image/*" multiple={multiple} className="hidden" onChange={(e) => uploadFiles(e.target.files)} />
      {value ? <img src={value} alt={label} className="h-32 w-32 rounded-2xl object-cover" /> : null}
    </div>
  );
}

export function GoogleMapEmbed({ mapLink }: { mapLink?: string | null }) {
  if (!mapLink) return null;

  return <div className="space-y-4"><p className="font-tamil text-3xl text-slate-900">திருமண இடத்திற்கு வழி</p><iframe src={mapLink} className="h-80 w-full rounded-[28px] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><a href={mapLink} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-slate-900 px-5 py-3 font-medium text-white">வழிகாட்டி திற</a></div>;
}

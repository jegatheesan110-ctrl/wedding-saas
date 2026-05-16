"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function PhotoCarousel({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!photos.length) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % photos.length), 3500);
    return () => clearInterval(timer);
  }, [photos.length]);

  if (!photos.length) return null;

  return (
    <div className="space-y-4">
      <div className="relative h-[360px] overflow-hidden rounded-[32px] bg-white/10">
        <AnimatePresence mode="wait">
          <motion.img
            key={photos[index]}
            src={photos[index]}
            alt="gallery"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-2">
        {photos.map((photo, photoIndex) => (
          <button key={photo} onClick={() => setIndex(photoIndex)} className={`h-3 w-3 rounded-full ${photoIndex === index ? "bg-brand.rose" : "bg-white/40"}`} />
        ))}
      </div>
    </div>
  );
}

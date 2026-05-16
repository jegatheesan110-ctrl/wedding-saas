"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function DoorAnimation({ children, variant = "door" }: { children: React.ReactNode; variant?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="perspective-card">
      <div className={cn("template-door relative overflow-hidden", open && "open", variant === "curtain" && "before:bg-brand.maroon after:bg-brand.maroon")}>{children}</div>
    </div>
  );
}

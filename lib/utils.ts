import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugifyInvitation(brideName: string, groomName: string, weddingDate: string) {
  const date = new Date(weddingDate).toISOString().slice(0, 10);
  return [brideName, groomName, date]
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9\u0b80-\u0bff]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatTamilDate(date: string | Date) {
  return new Intl.DateTimeFormat("ta-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

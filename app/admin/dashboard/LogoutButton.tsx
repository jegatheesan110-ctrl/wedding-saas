"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton({ className }: { className?: string }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin" })}
      className={className || "inline-flex items-center text-gray-600 hover:text-gray-900"}
    >
      <LogOut className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}

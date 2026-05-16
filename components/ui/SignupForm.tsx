"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const payload = {
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      confirmPassword: String(formData.get("confirmPassword") || ""),
    };

    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "பதிவு செய்ய முடியவில்லை");
      return;
    }

    router.push("/pricing");
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-white">
      <p className="font-display text-xl text-brand.blush">Create Account</p>
      <h1 className="mt-3 font-tamil text-4xl">கணக்கு உருவாக்கு</h1>
      <form action={handleSubmit} className="mt-8 space-y-5">
        <input name="email" type="email" placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" required />
        <input name="password" type="password" placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" required />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" required />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button disabled={loading} className="w-full rounded-full bg-brand.rose px-5 py-3 font-semibold text-white">{loading ? "சில நொடிகள்..." : "கணக்கு உருவாக்கு"}</button>
      </form>
      <p className="mt-5 text-sm text-white/60">Google sign in-ஐ login page-ல் பயன்படுத்தலாம்.</p>
    </div>
  );
}

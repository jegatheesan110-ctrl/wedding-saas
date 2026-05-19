"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", { email: String(formData.get("email") || ""), password: String(formData.get("password") || ""), redirect: false });
    setLoading(false);

    if (result?.error) {
      setError("தவறான email அல்லது password");
      return;
    }

    router.push("/admin/dashboard");
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-[32px] border border-white/10 bg-white/5 p-8 text-white">
      <p className="font-display text-xl text-brand.blush">Welcome Back</p>
      <h1 className="mt-3 font-tamil text-4xl">உள்நுழை</h1>
      <form action={handleSubmit} className="mt-8 space-y-5">
        <input name="email" type="email" placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" required />
        <input name="password" type="password" placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none" required />
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        <button disabled={loading} className="w-full rounded-full bg-brand.rose px-5 py-3 font-semibold text-white">{loading ? "சில நொடிகள்..." : "உள்நுழை"}</button>
      </form>
      <button onClick={() => signIn("google", { callbackUrl: "/admin/dashboard" })} className="mt-4 w-full rounded-full border border-white/20 px-5 py-3 font-semibold text-white">Google மூலம் தொடர்க</button>
      <Link href="mailto:support@example.com" className="mt-5 block text-center text-sm text-brand.blush">Forgot password link</Link>
    </div>
  );
}

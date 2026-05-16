"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const features = [
  "All 6 wedding invitation templates unlocked",
  "Create up to 3 invitation webpages",
  "Unlimited guest views",
  "Lifetime access",
  "Edit invitation anytime from dashboard",
  "Guest messaging inbox",
  "WhatsApp share link",
];

export function PricingCheckout() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleCheckout() {
    setLoading(true);
    setMessage("");

    const orderRes = await fetch("/api/payment/create-order", { method: "POST" });
    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      setLoading(false);
      setMessage(orderData.error || "Order உருவாக்க முடியவில்லை");
      return;
    }

    if (!window.Razorpay) {
      setLoading(false);
      setMessage("Razorpay script load ஆகவில்லை");
      return;
    }

    const razorpay = new window.Razorpay({
      key: orderData.key,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "வந்தனம்",
      description: "Tamil Wedding Invitation Plan",
      order_id: orderData.order.id,
      handler: async function (response: Record<string, string>) {
        const verifyRes = await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        if (verifyRes.ok) {
          router.push("/create");
        } else {
          const verifyData = await verifyRes.json();
          setMessage(verifyData.error || "Payment verify செய்ய முடியவில்லை");
        }
      },
      theme: { color: "#B76E79" },
      prefill: orderData.prefill,
    });

    razorpay.open();
    setLoading(false);
  }

  return (
    <div className="rounded-[36px] border border-brand.gold/30 bg-white/5 p-8 text-white shadow-glow sm:p-10">
      <p className="font-display text-xl text-brand.blush">One-Time Plan</p>
      <h1 className="mt-3 text-5xl font-semibold">₹1000</h1>
      <p className="mt-3 text-white/70">ஒருமுறை கட்டணம். அனைத்து premium அம்சங்களும் unlock ஆகும்.</p>
      <ul className="mt-8 grid gap-3 text-white/80 sm:grid-cols-2">{features.map((feature) => <li key={feature} className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3">{feature}</li>)}</ul>
      {message ? <p className="mt-6 text-sm text-red-300">{message}</p> : null}
      <button onClick={handleCheckout} disabled={loading} className="mt-8 rounded-full bg-brand.gold px-7 py-3 font-semibold text-black">{loading ? "செயல்படுத்தப்படுகிறது..." : "இப்போதே வாங்கு"}</button>
      <script src="https://checkout.razorpay.com/v1/checkout.js" async />
    </div>
  );
}

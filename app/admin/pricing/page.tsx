"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { Check, Loader2, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLANS = [
  { 
    id: "starter", 
    name: "Starter", 
    price: 999, 
    limit: 30, 
    features: ["30 Invitations per month", "All Templates"] 
  },
  { 
    id: "standard", 
    name: "Standard", 
    price: 1999, 
    limit: 75, 
    features: ["75 Invitations per month", "All Templates"] 
  },
  { 
    id: "premium", 
    name: "Premium", 
    price: 3999, 
    limit: 999999, 
    features: ["Unlimited Invitations", "All Templates"] 
  }
];

export default function ShopPricingPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const msg = urlParams.get("message");
      if (msg) setMessage(msg);
    }
  }, []);

  const handleSubscribe = async (plan: typeof PLANS[0]) => {
    try {
      setLoadingPlan(plan.id);
      
      let shopId = localStorage.getItem('shopId')
      if (!shopId) {
        const sessionRes = await fetch('/api/auth/session')
        const session = await sessionRes.json()
        shopId = session?.user?.id || 
                 session?.user?.shopId || null
      }
      console.log('Final shopId:', shopId)

      // 1. Create order
      const response = await fetch("/api/admin/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: plan.id, amount: plan.price }),
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error);

      // 2. Open Razorpay modal
      const options = {
        key: "rzp_test_Si8gMgFDsNCx4P", // Test key
        amount: data.amount,
        currency: "INR",
        name: "Wedding SaaS Admin",
        description: `${plan.name} Subscription`,
        order_id: data.orderId,
        handler: async function(response: any) {
          try {
            const verifyRes = await fetch('/api/admin/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                shopId: shopId,
                plan: plan.id
              })
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              window.location.href = '/admin/dashboard'
            } else {
              alert('Payment verification failed: ' + verifyData.error);
            }
          } catch (err) {
            console.error('Verification error:', err);
            alert('Something went wrong during verification.');
          }
        },
        prefill: {
          name: "Shop Owner",
          email: "shop@example.com",
        },
        theme: {
          color: "#9333ea",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="max-w-7xl mx-auto">
        {message && (
          <div className="mb-8 max-w-3xl mx-auto bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md flex items-start shadow-sm">
            <AlertCircle className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-amber-800 font-medium">{message}</p>
          </div>
        )}

        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Subscription Plans for Shops
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the right plan to grow your wedding invitation business
          </p>
          <div className="mt-6">
            <Link href="/admin/dashboard" className="text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-1">
              Already have an active plan? Go to Dashboard ✨
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-lg mx-auto lg:max-w-none">
          {PLANS.map((plan) => (
            <div key={plan.id} className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-4 flex items-baseline text-4xl font-extrabold text-gray-900">
                  ₹{plan.price}
                  <span className="ml-1 text-xl font-medium text-gray-500">/mo</span>
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  {plan.limit === 999999 ? "Unlimited" : plan.limit} invitations per month
                </p>
                
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100 rounded-b-lg">
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loadingPlan === plan.id}
                  className="w-full bg-purple-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loadingPlan === plan.id ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                      Processing...
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

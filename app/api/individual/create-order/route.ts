import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const amount = 19900; // 199 INR

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_ind_${Date.now()}`
    });

    return NextResponse.json({
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Individual order creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";

const PLAN_AMOUNTS: Record<string, number> = {
  starter: 99900,
  standard: 199900,
  premium: 399900,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { plan, shopId } = body;

    if (!plan || !PLAN_AMOUNTS[plan]) {
      return NextResponse.json(
        { error: "Invalid or missing plan. Valid plans: starter, standard, premium." },
        { status: 400 }
      );
    }

    if (!shopId) {
      return NextResponse.json(
        { error: "shopId is required." },
        { status: 400 }
      );
    }

    const amount = PLAN_AMOUNTS[plan];

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: 'ord_' + Date.now().toString().slice(-10),
      notes: {
        shopId,
        plan,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      plan,
    });
  } catch (error: unknown) {
    console.error("[create-order] Error:", error);
    return NextResponse.json(
      { error: "Failed to create Razorpay order." },
      { status: 500 }
    );
  }
}

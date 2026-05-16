import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getAuthSession } from "@/lib/auth";

const razorpay = new Razorpay({
  key_id: "rzp_test_Si8gMgFDsNCx4P",
  key_secret: "32KBzcHoA04hr5C8k6z1d3uC",
});

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== "shop") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId, amount } = await req.json();

    if (!amount || !planId) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: 'ord' + Date.now().toString().slice(-10),
    });

    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount 
    });
  } catch (error) {
    console.error("Payment API Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

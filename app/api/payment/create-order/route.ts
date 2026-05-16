import { NextResponse } from "next/server";
import { PLAN_AMOUNT } from "@/data/templates";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export async function POST() {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const order = await razorpay.orders.create({ amount: PLAN_AMOUNT, currency: "INR", receipt: `receipt_${user.id}` });
  await prisma.payment.create({ data: { userId: user.id, amount: PLAN_AMOUNT, currency: "INR", razorpayOrderId: order.id, status: "pending" } });

  return NextResponse.json({ order, key: process.env.RAZORPAY_KEY_ID, prefill: { email: user.email, name: user.name } });
}

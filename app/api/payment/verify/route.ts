import crypto from "crypto";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { sendPaymentConfirmation } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
    .update(body.razorpay_order_id + "|" + body.razorpay_payment_id)
    .digest("hex");

  if (signature !== body.razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const user = await prisma.user.update({ where: { email: session.user.email }, data: { isPaid: true } });
  await prisma.payment.updateMany({ where: { razorpayOrderId: body.razorpay_order_id }, data: { razorpayPaymentId: body.razorpay_payment_id, status: "paid" } });
  await sendPaymentConfirmation(user.email);

  return NextResponse.json({ success: true });
}

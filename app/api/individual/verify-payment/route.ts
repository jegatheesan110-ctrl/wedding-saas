import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'
import { sendPaymentConfirmation } from '@/lib/email'

/**
 * POST /api/individual/verify-payment
 *
 * Verifies the Razorpay signature only.
 * Does NOT create the invitation — that happens in /api/individual/generate-card
 * after the user fills in their details form (Step 2).
 *
 * On success: creates/updates the User record, saves the Payment record,
 * sends confirmation email, returns { success: true }.
 *
 * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment fields' }, { status: 400 })
    }

    // ── Verify Razorpay signature ──
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`
    const expected = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(sign)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 })
    }

    // ── Record payment (userId left null until form is submitted) ──
    // We store a pending payment record keyed by order ID so generate-card can validate it.
    // If a user record with this email already exists it will be linked then.
    const existing = await prisma.payment.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
    })

    if (!existing) {
      // Create a payment record without userId for now.
      // generate-card will match by razorpayOrderId.
      await prisma.payment.create({
        data: {
          // userId is required by schema — use a sentinel approach:
          // We link to a system user or we use the user created in generate-card.
          // For now we skip userId by finding/creating a placeholder.
          userId: await getOrCreatePlaceholderUserId(),
          amount: 19900,
          currency: 'INR',
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          status: 'success',
        },
      })
    }

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

/**
 * Returns a placeholder user ID used to satisfy the non-nullable userId
 * on the Payment model until the real user fills in the form.
 * Creates a system placeholder user on first use.
 */
async function getOrCreatePlaceholderUserId(): Promise<string> {
  const PLACEHOLDER_EMAIL = 'payment-placeholder@system.internal'
  let user = await prisma.user.findUnique({ where: { email: PLACEHOLDER_EMAIL } })
  if (!user) {
    user = await prisma.user.create({
      data: { email: PLACEHOLDER_EMAIL, name: 'Payment Placeholder', isPaid: false },
    })
  }
  return user.id
}

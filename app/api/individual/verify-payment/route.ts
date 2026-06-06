import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'
import { slugifyInvitation } from '@/lib/utils'
import { sendPaymentConfirmation } from '@/lib/email'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      form,
      templateId
    } = body

    if (!form || !form.email) {
      return NextResponse.json({ error: 'Form data missing' }, { status: 400 })
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expected = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '32KBzcHoA04hr5C8k6z1d3uC')
      .update(sign)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Find or Create User
    let user = await prisma.user.findUnique({
      where: { email: form.email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: form.email,
          name: `${form.brideName} & ${form.groomName}`,
          isPaid: true,
        },
      })
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: { isPaid: true },
      })
    }

    // Generate Unique Slug
    let slug = slugifyInvitation(form.brideName, form.groomName, form.weddingDate)
    const existing = await prisma.invitation.findUnique({ where: { slug } })
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`
    }

    // Create Invitation
    const invitation = await prisma.invitation.create({
      data: {
        userId: user.id,
        slug,
        templateId: templateId || "royal-elegance",
        brideName: form.brideName || "Bride",
        groomName: form.groomName || "Groom",
        weddingDate: form.weddingDate ? new Date(form.weddingDate) : new Date(),
        venueName: form.weddingVenue || null,
        venueAddress: form.weddingVenue || null,
        familyNames: form.familyNames || null,
        email: form.email || null,
        photo1: form.photo1 || null,
        photo2: form.photo2 || null,
        photo3: form.photo3 || null,
        photo4: form.photo4 || null,
        isPublished: true,
      },
    })

    // Create Payment Record
    await prisma.payment.create({
      data: {
        userId: user.id,
        amount: 19900,
        currency: 'INR',
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: 'success'
      }
    })

    // Send confirmation email
    try {
      await sendPaymentConfirmation(form.email)
    } catch (e) {
      console.error("Failed to send email", e)
      // Do not fail the request if email fails
    }

    return NextResponse.json({ success: true, slug: invitation.slug })

  } catch (error: any) {
    console.error('Verify error:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}

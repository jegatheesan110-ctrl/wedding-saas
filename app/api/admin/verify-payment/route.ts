import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      shopId,
      plan
    } = body

    console.log('Verify payment - shopId:', shopId)
    console.log('Verify payment - plan:', plan)

    if (!shopId) {
      return NextResponse.json(
        { error: 'ShopId missing' },
        { status: 400 }
      )
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id
    const expected = createHmac('sha256',
      '32KBzcHoA04hr5C8k6z1d3uC')
      .update(sign).digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const limits: { [key: string]: number } = {
      starter: 30,
      standard: 75,
      premium: 999999
    }

    const now = new Date()
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30)

    const updated = await prisma.shop.update({
      where: { id: shopId },
      data: {
        plan: plan,
        isActive: true,
        planStartDate: now,
        planEndDate: endDate,
        invitationsLimit: limits[plan] || 30,
        invitationsUsed: 0
      }
    })

    console.log('Shop updated:', updated.plan, updated.isActive)

    const response = NextResponse.json({ success: true })
    response.cookies.set('shopId', shopId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/'
    })
    return response

  } catch (error) {
    console.error('Verify error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

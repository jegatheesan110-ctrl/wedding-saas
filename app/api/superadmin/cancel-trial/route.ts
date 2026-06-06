import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { shopId } = await req.json()
    
    await prisma.shop.update({
      where: { id: shopId },
      data: {
        plan: 'none',
        isActive: false,
        planStartDate: null,
        planEndDate: null,
        invitationsLimit: 0,
        invitationsUsed: 0
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

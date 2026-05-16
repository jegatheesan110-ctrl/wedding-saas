import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { shopId } = await req.json()
    
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + 30)
    
    await prisma.shop.update({
      where: { id: shopId },
      data: {
        plan: 'standard',
        isActive: true,
        planStartDate: new Date(),
        planEndDate: endDate,
        invitationsLimit: 75,
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

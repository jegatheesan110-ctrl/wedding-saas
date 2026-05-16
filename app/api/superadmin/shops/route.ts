import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const shops = await prisma.shop.findMany({
      orderBy: { createdAt: 'desc' }
    })
    const totalInvitations = 
      await prisma.invitation.count()
    return NextResponse.json({ 
      shops, 
      totalInvitations 
    })
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

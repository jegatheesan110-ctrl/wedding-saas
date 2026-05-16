import { NextRequest, NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    console.log('Register attempt started')
    const body = await request.json()
    const { 
      shopName, 
      ownerName, 
      email, 
      phone, 
      city, 
      password 
    } = body

    // Check if email exists
    const existing = await prisma.shop.findUnique({
      where: { email }
    })
    
    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create shop
    const shop = await prisma.shop.create({
      data: {
        shopName,
        ownerName,
        email,
        phone,
        city,
        password: hashedPassword,
        plan: 'none',
        isActive: false
      }
    })

    console.log('Registration successful for shop:', shop.id)
    return NextResponse.json({
      success: true,
      shopId: shop.id,
      message: 'Registration successful'
    })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    )
  }
}

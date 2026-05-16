import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, confirmPassword } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: "Email மற்றும் password அவசியம்" }, { status: 400 });
    }
    
    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords பொருந்தவில்லை" }, { status: 400 });
    }

    // Bypass database check for now as requested
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

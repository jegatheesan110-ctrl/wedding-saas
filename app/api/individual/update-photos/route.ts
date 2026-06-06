import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { slug, photos } = body;

    if (!slug || !photos || !Array.isArray(photos)) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }

    const invitation = await prisma.invitation.findUnique({
      where: { slug },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    // Update photos
    await prisma.invitation.update({
      where: { slug },
      data: {
        photo1: photos[0] || null,
        photo2: photos[1] || null,
        photo3: photos[2] || null,
        photo4: photos[3] || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Update photos error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

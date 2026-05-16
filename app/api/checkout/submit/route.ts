import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugifyInvitation } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      templateId,
      brideName,
      groomName,
      weddingDate,
      weddingTime,
      weddingVenue,
      mapLink,
      familyNames,
      photoUrl,
      photo1,
      photo2,
      photo3,
      photo4,
      contactNumber,
      email,
    } = body;

    if (!email || !brideName || !groomName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Find or Create User
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `${brideName} & ${groomName}`,
          isPaid: true, // Mark as paid since they just came from checkout
        },
      });
    } else {
      // Update user to paid if not already
      await prisma.user.update({
        where: { id: user.id },
        data: { isPaid: true },
      });
    }

    // 2. Generate Unique Slug
    let slug = slugifyInvitation(brideName, groomName, weddingDate);
    
    // Check if slug exists, add random string if so
    const existing = await prisma.invitation.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // 3. Create Invitation
    const invitation = await prisma.invitation.create({
      data: {
        userId: user.id,
        slug,
        templateId: templateId || "royal-elegance",
        brideName: brideName || "Bride",
        groomName: groomName || "Groom",
        weddingDate: weddingDate ? new Date(weddingDate) : new Date(),
        weddingTime: weddingTime || "TBD",
        venueName: weddingVenue || null,
        venueAddress: weddingVenue || null,
        mapLink: mapLink || null,
        couplePhoto: photoUrl || null,
        photo1: photo1 || null,
        photo2: photo2 || null,
        photo3: photo3 || null,
        photo4: photo4 || null,
        familyNames: familyNames || null,
        contactNumber: contactNumber || null,
        email: email || null,
        isPublished: true,
      },
    });

    return NextResponse.json({ success: true, slug: invitation.slug });
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

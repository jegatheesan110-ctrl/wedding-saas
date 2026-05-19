import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugifyInvitation } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { canCreateInvitation, countInvitationsThisMonth } from "@/lib/checkInvitationLimit";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
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

    // Generate Unique Slug
    let slug = slugifyInvitation(brideName, groomName, weddingDate);
    const existing = await prisma.invitation.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Check if logged-in user is a shop owner
    if (session?.user?.role === "shop") {
      const shop = await prisma.shop.findUnique({
        where: { id: session.user.id },
        include: { invitations: true },
      });

      if (!shop) {
        return NextResponse.json({ error: "Shop not found" }, { status: 404 });
      }

      // Check limits
      const invitationsThisMonth = countInvitationsThisMonth(shop.invitations);
      const limitCheck = canCreateInvitation(shop, invitationsThisMonth);
      if (!limitCheck.allowed) {
        return NextResponse.json({ error: limitCheck.reason }, { status: 403 });
      }

      // Create Invitation for Shop
      const invitation = await prisma.invitation.create({
        data: {
          shopId: shop.id,
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

      // Update shop invitationsUsed count
      await prisma.shop.update({
        where: { id: shop.id },
        data: { invitationsUsed: { increment: 1 } },
      });

      return NextResponse.json({ success: true, slug: invitation.slug });
    }

    // Fallback: Regular User flow
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

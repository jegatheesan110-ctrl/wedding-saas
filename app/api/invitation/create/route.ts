import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugifyInvitation } from "@/lib/utils";
import { canCreateInvitation } from "@/lib/checkInvitationLimit";

export async function POST(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const body = await request.json();
    const slug = slugifyInvitation(body.brideName, body.groomName, body.weddingDate);

    const invitationData = {
      slug,
      templateId: body.templateId,
      brideName: body.brideName,
      groomName: body.groomName,
      weddingDate: new Date(body.weddingDate),
      weddingTime: body.weddingTime,
      venueName: body.venueName,
      venueAddress: body.venueAddress,
      mapLink: body.mapLink,
      bridePhoto: body.bridePhoto,
      groomPhoto: body.groomPhoto,
      couplePhoto: body.couplePhoto,
      slideshowPhotos: body.slideshowPhotos || [],
      photoCaptions: body.photoCaptions || [],
      musicTrack: body.musicTrack,
      showPreWedding: Boolean(body.showPreWedding),
      preWeddingEvents: body.preWeddingEvents || [],
      showDressCode: Boolean(body.showDressCode),
      dressCode: body.dressCode,
      showTransport: Boolean(body.showTransport),
      transportInfo: body.transportInfo,
      isPublished: Boolean(body.isPublished),
    };

    if (session.user.role === "shop") {
      const shop = await prisma.shop.findUnique({ where: { email: session.user.email } });
      if (!shop) return NextResponse.json({ error: "Shop not found" }, { status: 404 });
      
      if (!canCreateInvitation(shop)) {
        return NextResponse.json({ error: "Monthly limit reached. Please upgrade your plan." }, { status: 403 });
      }

      const invitation = await prisma.invitation.create({
        data: {
          ...invitationData,
          shopId: shop.id,
        },
      });

      await prisma.shop.update({
        where: { id: shop.id },
        data: { invitationsUsed: { increment: 1 } },
      });

      return NextResponse.json({ invitation });
    } else {
      if (!session.user.isPaid) return NextResponse.json({ error: "Payment required" }, { status: 403 });
      
      const user = await prisma.user.findUnique({ where: { email: session.user.email }, include: { invitations: true } });
      if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
      if (user.invitations.length >= 3) return NextResponse.json({ error: "3 invitation limit reached" }, { status: 400 });

      const invitation = await prisma.invitation.create({
        data: {
          ...invitationData,
          userId: user.id,
        },
      });

      return NextResponse.json({ invitation });
    }
  } catch (error) {
    console.error("Invitation creation error:", error);
    return NextResponse.json({ error: "Failed to create invitation" }, { status: 500 });
  }
}

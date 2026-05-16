import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const invitation = await prisma.invitation.findFirst({ where: { slug: body.slug, user: { email: session.user.email } } });
  if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

  const updated = await prisma.invitation.update({
    where: { id: invitation.id },
    data: {
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
    },
  });
  return NextResponse.json({ invitation: updated });
}

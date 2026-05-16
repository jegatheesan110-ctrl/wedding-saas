import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const invitation = await prisma.invitation.findUnique({ where: { slug: body.slug } });
  if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

  const message = await prisma.guestMessage.create({
    data: {
      invitationId: invitation.id,
      guestName: body.guestName,
      attendance: body.attendance,
      guestCount: body.guestCount,
      message: body.message,
    },
  });

  return NextResponse.json({ message });
}

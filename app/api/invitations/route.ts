import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, role } = session.user;

    let invitations;
    if (role === "shop") {
      invitations = await prisma.invitation.findMany({
        where: { shopId: id },
        select: {
          id: true,
          slug: true,
          brideName: true,
          groomName: true,
          weddingDate: true,
          templateId: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      });
    } else {
      invitations = await prisma.invitation.findMany({
        where: { userId: id },
        select: {
          id: true,
          slug: true,
          brideName: true,
          groomName: true,
          weddingDate: true,
          templateId: true,
          createdAt: true,
        },
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json(invitations);
  } catch (error: any) {
    console.error("GET invitations error:", error);
    return NextResponse.json({ error: "Failed to fetch invitations" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getAuthSession();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing invitation ID" }, { status: 400 });
    }

    // Find invitation
    const invitation = await prisma.invitation.findUnique({
      where: { id },
    });

    if (!invitation) {
      return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
    }

    // Verify ownership
    if (session.user.role === "shop") {
      if (invitation.shopId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      await prisma.invitation.delete({
        where: { id },
      });

      // Decrement the shop's used count
      await prisma.shop.update({
        where: { id: session.user.id },
        data: { invitationsUsed: { decrement: 1 } },
      });
    } else {
      if (invitation.userId !== session.user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      await prisma.invitation.delete({
        where: { id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DELETE invitation error:", error);
    return NextResponse.json({ error: "Failed to delete invitation" }, { status: 500 });
  }
}

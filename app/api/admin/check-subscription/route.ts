import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== "shop") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const shop = await prisma.shop.findUnique({
      where: { id: session.user.id }
    });

    if (!shop) {
      return NextResponse.json({ error: "Shop not found" }, { status: 404 });
    }

    const now = new Date();
    const isExpired = shop.planEndDate && shop.planEndDate < now;

    if (isExpired && shop.isActive) {
      // Auto-expiry check triggered
      await prisma.shop.update({
        where: { id: shop.id },
        data: { isActive: false }
      });
      return NextResponse.json({ expired: true, updated: true });
    }

    return NextResponse.json({ expired: isExpired, updated: false });
  } catch (error) {
    console.error("Check subscription error:", error);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}

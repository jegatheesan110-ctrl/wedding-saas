import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Slug required" }, { status: 400 });

  const invitation = await prisma.invitation.findFirst({
    where: { slug, user: { email: session.user.email } },
    include: { messages: true },
  });

  if (!invitation) return NextResponse.json({ error: "Invitation not found" }, { status: 404 });

  const rows = ["guestName,attendance,guestCount,message,createdAt", ...invitation.messages.map((message) => [message.guestName, message.attendance, message.guestCount, message.message || "", message.createdAt.toISOString()].map((value) => `\"${String(value).replace(/\"/g, '\"\"')}\"`).join(","))].join("\n");

  return new Response(rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="${slug}-messages.csv"`,
    },
  });
}

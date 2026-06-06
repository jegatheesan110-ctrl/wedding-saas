import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugifyInvitation } from "@/lib/utils";

/**
 * POST /api/individual/generate-card
 *
 * Step 2 of the Individual flow — called AFTER payment is verified.
 * Requires razorpayOrderId as proof of payment.
 * Creates/finds the real User record and generates the invitation.
 *
 * Body: { email, razorpayOrderId, templateId, brideName, groomName,
 *         weddingDate, weddingTime, weddingVenue, familyNames,
 *         contactNumber, photo1, photo2, photo3, photo4 }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      razorpayOrderId,
      templateId,
      brideName,
      groomName,
      weddingDate,
      weddingTime,
      weddingVenue,
      familyNames,
      contactNumber,
      photo1,
      photo2,
      photo3,
      photo4,
    } = body;

    // ── Validate required fields ──
    if (!email || !brideName || !groomName) {
      return NextResponse.json(
        { error: "Missing required fields: email, brideName, groomName" },
        { status: 400 }
      );
    }

    // ── STRICT: payment must be verified ──
    if (!razorpayOrderId) {
      return NextResponse.json(
        { error: "Payment not verified. Please complete payment first." },
        { status: 403 }
      );
    }

    const payment = await prisma.payment.findFirst({
      where: { razorpayOrderId, status: "success" },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found or not successful. Please contact support." },
        { status: 403 }
      );
    }

    // ── Find or create the real User by email ──
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: `${brideName} & ${groomName}`,
          isPaid: true,
        },
      });
    } else {
      // Ensure they are marked as paid
      await prisma.user.update({
        where: { id: user.id },
        data: { isPaid: true },
      });
      user = { ...user, isPaid: true };
    }

    // ── Re-link the payment to the real user ──
    const PLACEHOLDER_EMAIL = "payment-placeholder@system.internal";
    const placeholder = await prisma.user.findUnique({ where: { email: PLACEHOLDER_EMAIL } });

    if (placeholder && payment.userId === placeholder.id) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { userId: user.id },
      });
    }

    // ── Generate unique slug ──
    let slug = slugifyInvitation(brideName, groomName, weddingDate);
    const existing = await prisma.invitation.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // ── Create Invitation (Individual — no shopId) ──
    const invitation = await prisma.invitation.create({
      data: {
        userId: user.id,
        // shopId intentionally omitted
        slug,
        templateId: templateId || "royal-elegance",
        brideName: brideName || "Bride",
        groomName: groomName || "Groom",
        weddingDate: weddingDate ? new Date(weddingDate) : new Date(),
        weddingTime: weddingTime || "TBD",
        venueName: weddingVenue || null,
        venueAddress: weddingVenue || null,
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
    console.error("Individual generate-card error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/dashboard/DashboardContent";

export default async function AdminDashboardPage() {
  const session = await getAuthSession();

  if (!session || session.user.role !== "shop") {
    redirect("/admin");
  }

  const shop = await prisma.shop.findUnique({
    where: { id: session.user.id },
    include: {
      invitations: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!shop) {
    redirect("/admin");
  }

  if (!shop.plan || shop.plan === "none") {
    redirect("/admin/pricing");
  }

  const now = new Date();
  const isExpired = shop.planEndDate ? shop.planEndDate < now : false;

  // Auto-expiry check logic
  if (isExpired && shop.isActive) {
    await prisma.shop.update({
      where: { id: shop.id },
      data: { isActive: false }
    });
    shop.isActive = false;
  }

  // Serialize dates to prevent RSC issues with raw Date objects
  const serializedShop = {
    id: shop.id,
    shopName: shop.shopName,
    plan: shop.plan,
    planEndDate: shop.planEndDate ? shop.planEndDate.toISOString() : null,
    isActive: shop.isActive,
  };

  const serializedInvitations = shop.invitations.map((inv) => ({
    id: inv.id,
    slug: inv.slug,
    brideName: inv.brideName,
    groomName: inv.groomName,
    weddingDate: inv.weddingDate.toISOString(),
    templateId: inv.templateId,
    createdAt: inv.createdAt.toISOString(),
  }));

  return (
    <DashboardContent
      initialShop={serializedShop}
      initialInvitations={serializedInvitations}
    />
  );
}

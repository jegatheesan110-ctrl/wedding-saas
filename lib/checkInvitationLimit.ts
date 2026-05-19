export type ShopForLimitCheck = {
  plan: string;
  invitationsLimit: number;
  planEndDate: Date | null;
  isActive: boolean;
};

/**
 * Returns { allowed: true } or { allowed: false, reason: string }
 * Uses the dynamic monthly count (passed in) for accurate per-month enforcement.
 */
export function canCreateInvitation(
  shop: ShopForLimitCheck,
  invitationsThisMonth: number
): { allowed: boolean; reason?: string } {
  const now = new Date();

  // Check plan expiry
  const isExpired = shop.planEndDate ? shop.planEndDate < now : true;
  if (isExpired || !shop.isActive) {
    return { allowed: false, reason: "Plan Expired! Renew to continue" };
  }

  // Premium plan = unlimited
  if (shop.plan === "premium") {
    return { allowed: true };
  }

  // Check monthly limit based on plan
  const planLimit = shop.plan === "standard" ? 75 : (shop.plan === "starter" ? 30 : 0);
  if (invitationsThisMonth >= planLimit) {
    return {
      allowed: false,
      reason: "Plan limit reached! Upgrade your plan",
    };
  }

  return { allowed: true };
}

/**
 * Returns how many invitations were created this calendar month for a shop.
 */
export function countInvitationsThisMonth(
  invitations: Array<{ createdAt: Date }>
): number {
  const now = new Date();
  return invitations.filter((inv) => {
    const d = new Date(inv.createdAt);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  }).length;
}

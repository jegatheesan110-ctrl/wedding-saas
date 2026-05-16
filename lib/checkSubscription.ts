export function checkSubscription(shop: {
  isActive: boolean;
  planEndDate: Date | null;
}) {
  if (!shop.isActive) return false;
  if (!shop.planEndDate) return false;
  
  const now = new Date();
  const endDate = new Date(shop.planEndDate);
  
  if (now > endDate) {
    // Plan expired - deactivate
    return false;
  }
  return true;
}

export function canCreateInvitation(shop: {
  plan: string;
  invitationsUsed: number;
  invitationsLimit: number;
}) {
  // Premium plan = unlimited
  if (shop.plan === 'premium') return true;
  
  // Check if under limit
  if (shop.invitationsUsed < shop.invitationsLimit) {
    return true;
  }
  return false;
}

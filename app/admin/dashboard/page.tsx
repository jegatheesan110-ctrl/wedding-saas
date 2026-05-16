import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { Plus, Eye, Trash2, Calendar, Users, LayoutTemplate, Clock, AlertTriangle } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboardPage() {
  const session = await getAuthSession();

  if (!session || session.user.role !== "shop") {
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
  }

  if (shop.plan === "none") {
  }

  const now = new Date();
  const isExpired = shop.planEndDate ? shop.planEndDate < now : false;

  let isActuallyExpired = isExpired || !shop.isActive;

  // Auto-expiry check logic
  if (isExpired && shop.isActive) {
    await prisma.shop.update({
      where: { id: shop.id },
      data: { isActive: false }
    });
    isActuallyExpired = true;
    shop.isActive = false;
  }

  const getDaysRemaining = (planEndDate: Date | null) => {
    if (!planEndDate) return 0;
    const end = new Date(planEndDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysRemaining = getDaysRemaining(shop?.planEndDate);
  
  const getDaysColor = (days: number) => {
    if (days > 10) return "text-green-600";
    if (days > 0) return "text-orange-600";
    return "text-red-600";
  };
  
  const invitationsThisMonth = shop.invitations.filter(inv => {
    const invDate = new Date(inv.createdAt);
    return invDate.getMonth() === now.getMonth() && invDate.getFullYear() === now.getFullYear();
  }).length;

  const invitationsUsed = shop.invitationsUsed;
  const invitationsLimit = shop.invitationsLimit;
  const percentUsed = invitationsLimit > 0 ? (invitationsUsed / invitationsLimit) * 100 : 0;
  
  const limitReached = !isActuallyExpired && shop.plan !== "premium" && percentUsed >= 100;
  const showWarning = !isActuallyExpired && shop.plan !== "premium" && percentUsed >= 80 && percentUsed < 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TOP BAR */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">{shop.shopName}</h1>
              <span className="ml-4 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize border border-purple-200 hidden sm:inline-block">
                {shop.plan} Plan
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex flex-col items-end">
                <span className="font-medium text-gray-900">
                  Used: {shop.invitationsUsed}/{shop.invitationsLimit === 0 ? 'Unlimited' : shop.invitationsLimit}
                </span>
                <span className={`text-xs font-medium ${getDaysColor(daysRemaining)}`}>
                  {daysRemaining > 0 ? `${daysRemaining} days remaining` : "Plan expired"}
                </span>
              </div>
              <LogoutButton className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-colors" />
            </div>
          </div>
        </div>
      </header>

      {/* MAIN DASHBOARD */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* WARNING BANNERS */}
        {shop.planEndDate && new Date(shop.planEndDate) < new Date() && shop.isActive === false && (
          <div className="mb-8 max-w-7xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex flex-col sm:flex-row items-center justify-between shadow-sm">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-bold text-lg">Your plan has expired</p>
                <p className="text-red-700 text-sm">Please renew your subscription to create new invitations. Existing invitations will remain active.</p>
              </div>
            </div>
            <Link href="/admin/pricing" className="mt-4 sm:mt-0 whitespace-nowrap bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition">
              Renew Now
            </Link>
          </div>
        )}

        {limitReached && (
          <div className="mb-8 max-w-7xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-md flex flex-col sm:flex-row items-center justify-between shadow-sm">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <p className="text-red-800 font-bold text-lg">Monthly Limit Reached</p>
                <p className="text-red-700 text-sm">You have used 100% of your invitations this month.</p>
              </div>
            </div>
            <Link href="/admin/pricing" className="mt-4 sm:mt-0 whitespace-nowrap bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition">
              Upgrade Plan
            </Link>
          </div>
        )}

        {showWarning && (
          <div className="mb-8 max-w-7xl mx-auto bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md flex items-center shadow-sm">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" />
            <div>
              <p className="text-yellow-800 font-bold text-lg">Running low on invitations</p>
              <p className="text-yellow-700 text-sm">You have only {invitationsLimit - invitationsUsed} invitations remaining this month.</p>
            </div>
          </div>
        )}

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <LayoutTemplate className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Invitations</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{shop.invitations.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Created This Month</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{invitationsThisMonth}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Days Remaining</dt>
                    <dd className="flex items-baseline">
                      <div className={`text-2xl font-semibold ${getDaysColor(daysRemaining)}`}>
                        {daysRemaining > 0 ? daysRemaining : "Expired"}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-100">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Current Plan</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900 capitalize">{shop.plan}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INVITATIONS LIST */}
        <div className="bg-white shadow rounded-lg border border-gray-200">
          <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-center border-b border-gray-200 gap-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900 w-full sm:w-auto">
              Your Invitations
            </h3>
            
            {isActuallyExpired || limitReached ? (
              <button disabled className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed">
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Create New Invitation
              </button>
            ) : (
              <Link
                href="/templates"
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Create New Invitation
              </Link>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Couple Names
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wedding Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {shop.invitations.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <p className="text-lg mb-2">No invitations created yet.</p>
                      <p className="text-sm">Click "Create New Invitation" to get started.</p>
                    </td>
                  </tr>
                ) : (
                  shop.invitations.map((inv) => (
                    <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {inv.brideName} & {inv.groomName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(inv.weddingDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {inv.templateId}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(inv.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <Link 
                            href={`/invitation/${inv.slug}`} 
                            target="_blank"
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                            title="View Invitation"
                          >
                            <Eye className="h-5 w-5" />
                          </Link>
                          <button 
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Delete Invitation"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

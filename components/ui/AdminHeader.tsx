'use client';
import Link from 'next/link';

export function AdminHeader() {
  const handleLogout = () => {
    document.cookie = 'shop_admin_session=; max-age=0; path=/'; // Adjust based on admin login cookie name
    window.location.href = '/admin';
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2] px-6 py-4 shadow-sm border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/admin/dashboard" className="font-tamil text-2xl font-bold text-[#D4AF37]">
          வந்தனம்
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/dashboard" 
            className="text-sm font-medium text-gray-700 hover:text-[#D4AF37] transition-colors"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 border border-red-200 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

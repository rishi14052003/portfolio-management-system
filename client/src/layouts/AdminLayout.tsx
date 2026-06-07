import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';

const titleMap: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/leads': 'Lead Management',
  '/admin/settings': 'Settings',
};

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = titleMap[location.pathname] || 'Admin';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

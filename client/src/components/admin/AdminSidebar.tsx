import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { ADMIN_ROUTES } from '@/constants';
import { cn } from '@/utils/cn';

const navItems = [
  { to: ADMIN_ROUTES.DASHBOARD, icon: LayoutDashboard, label: 'Dashboard' },
  { to: ADMIN_ROUTES.LEADS, icon: Users, label: 'Leads' },
  { to: ADMIN_ROUTES.SETTINGS, icon: Settings, label: 'Settings' },
];

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const { logout, user } = useAuth();

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-br-2xl">
          <div>
            <h2 className="font-display font-bold text-lg">Admin Panel</h2>
            {user && <p className="text-xs opacity-90 mt-1">{user.username}</p>}
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-white/20">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-primary-600 dark:text-primary-400 border border-primary-300/30 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50'
                )
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

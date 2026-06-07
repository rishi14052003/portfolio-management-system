import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function AdminHeader({ onMenuClick, title }: AdminHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 md:px-6 h-16">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-display font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          {user && (
            <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
              {user.username}
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

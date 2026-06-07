import { motion } from 'framer-motion';
import { Settings, Shield, Mail, Database } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">General Settings</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Theme</p>
              <p className="text-sm text-gray-500">Choose your preferred appearance</p>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
              className="input-field w-auto"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Account</h3>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-gray-500">Username</span>
            <span className="font-medium text-gray-900 dark:text-white">{user?.username}</span>
          </div>
          <div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <span className="text-gray-500">Role</span>
            <span className="font-medium text-gray-900 dark:text-white capitalize">{user?.role}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Configuration</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Email settings are configured via server environment variables (MAIL_SERVER, MAIL_USERNAME, etc.).
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-primary-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Data Storage</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Leads and PDFs are stored locally on the server. PDFs are saved in <code className="text-primary-500">server/app/generated_pdfs/</code>.
        </p>
      </motion.div>
    </div>
  );
}

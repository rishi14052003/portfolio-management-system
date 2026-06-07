import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { AdminLayout } from '@/layouts/AdminLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { LoginPage } from '@/pages/Admin/LoginPage';
import { DashboardPage } from '@/pages/Admin/DashboardPage';
import { LeadsPage } from '@/pages/Admin/LeadsPage';
import { SettingsPage } from '@/pages/Admin/SettingsPage';
import { ADMIN_ROUTES } from '@/constants';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path={ADMIN_ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to={ADMIN_ROUTES.DASHBOARD} replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

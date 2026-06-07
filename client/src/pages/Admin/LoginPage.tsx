import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { loginSchema, type LoginFormValues } from '@/validations/adminSchema';
import { useAuth } from '@/context/AuthContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ADMIN_ROUTES } from '@/constants';

export function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || ADMIN_ROUTES.DASHBOARD;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate, from]);

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.username, data.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-900 dark:to-primary-950 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white">Admin Login</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            id="username"
            label="Username"
            placeholder="admin"
            error={errors.username?.message}
            {...register('username')}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            <User className="w-4 h-4" />
            Sign In
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

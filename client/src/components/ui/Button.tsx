import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'btn-primary',
      outline: 'btn-outline',
      ghost: 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
      danger: 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-500 transition-colors',
    };

    const sizes = {
      sm: 'text-sm px-4 py-2',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          variants[variant],
          sizes[size],
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0',
          className
        )}
        {...props}
      >
        {isLoading ? <LoadingSpinner size="sm" /> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

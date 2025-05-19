import { forwardRef } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      icon,
      iconPosition = 'left',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const getVariantClass = () => {
      switch (variant) {
        case 'primary':
          return 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-500';
        case 'secondary':
          return 'bg-secondary text-white hover:bg-secondary-600 focus:ring-secondary-500';
        case 'outline':
          return 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary-500';
        case 'text':
          return 'bg-transparent text-primary hover:bg-gray-100 focus:ring-primary-500';
        default:
          return 'bg-primary text-white hover:bg-primary-600 focus:ring-primary-500';
      }
    };

    const getSizeClass = () => {
      switch (size) {
        case 'sm':
          return 'px-3 py-1.5 text-sm';
        case 'md':
          return 'px-5 py-2.5';
        case 'lg':
          return 'px-6 py-3 text-lg';
        default:
          return 'px-5 py-2.5';
      }
    };

    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2',
          getVariantClass(),
          getSizeClass(),
          fullWidth ? 'w-full' : '',
          disabled || isLoading ? 'opacity-70 cursor-not-allowed' : '',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {icon && iconPosition === 'left' && !isLoading && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
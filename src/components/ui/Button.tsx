// src/components/ui/Button.tsx
import React from 'react';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
    isLoading?: boolean;
};

const Button = ({ children, className, isLoading = false, ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            disabled={isLoading}
            className={`w-full px-4 py-2 font-bold text-white bg-sky-500 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-sky-800 disabled:cursor-not-allowed ${className}`}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
};

export default Button;
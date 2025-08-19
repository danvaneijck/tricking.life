// src/components/ui/Input.tsx
import React from 'react';

type InputProps = React.ComponentPropsWithoutRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input
            {...props}
            ref={ref}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
    );
});

export default Input;
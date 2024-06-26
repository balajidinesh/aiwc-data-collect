// Input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    value : string ;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, value, ...props }, ref) => {
        return (
            <input
                type={type}
                className={ "flex h-10 "+
                    (className ? `${className}` : "w-full sm:w-[32vw] md:w-[22vw]")+ " my-2 mx-1 rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                ref={ref}
                value={value}
                // defaultValue={value}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

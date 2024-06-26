// Input.tsx
import React from "react";
import {InputProps} from "react-select";


const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type,defaultValue, ...props }, ref) => {
        return (
            <input
                type={type}
                className={
                    "flex h-10 w-full sm:w-[40vw] md:w-[27vw] rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                }
                ref={ref}
                defaultValue={defaultValue}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";

export { Input };

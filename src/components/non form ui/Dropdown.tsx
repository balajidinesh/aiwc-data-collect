// Dropdown.tsx
import React from 'react';


interface DropdownOption {
    label: string;
    value: string | number;
}

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: DropdownOption[];
}


const Dropdown: React.FC<DropdownProps> = React.forwardRef<HTMLSelectElement, DropdownProps>(
    ({ className, options, ...props }, ref) => {
        return (
            <select
                ref={ref}

                className={`
          flex h-10 w-[70vw] sm:w-[35vw] md:w-[22vw] mb-4
          rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background
          file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
                {...props}
            >
                <option disabled={true} value="">
                    --Choose and option--
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }
);

Dropdown.displayName = 'Dropdown';

export {Dropdown};
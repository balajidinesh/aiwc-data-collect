// Dropdown.tsx
import React from 'react';

interface DropdownOption {
    label: string;
    value: string | number;
}

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: DropdownOption[];
    defaultValue?: string | number; // Add defaultValue prop
}

const Dropdown: React.FC<DropdownProps> = React.forwardRef<HTMLSelectElement, DropdownProps>(
    ({ className, options, defaultValue, ...props }, ref) => {
        return (
            <select
                ref={ref}
                className={`
                    flex h-10 w-[70vw] sm:w-[40vw] md:w-[27vw] mb-4
                    rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background
                    file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                    disabled:cursor-not-allowed disabled:opacity-50
                    ${className}
                `}
                {...props}
                defaultValue={defaultValue} // Set defaultValue
            >
                <option disabled={true} value="">
                    --Choose and option--</option>
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

export { Dropdown };

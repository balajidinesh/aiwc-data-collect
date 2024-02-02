// LabelAndDropdownText.tsx
import React from 'react';
import {Dropdown} from "@/components/Dropdown";

interface LabelAndDropdownProps {
    label: string;
    name: string;
    defaultValue : string ;
    options: boolean | { value: string ; label: string }[] | undefined ;
    register: any;
    required?: boolean;
    onChange : ( value : string) => void ;
}

const LabelAndDropdown: React.FC<LabelAndDropdownProps> = ({ label, name, defaultValue,options, register, required = false ,onChange}) => {
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onChange(value);
    };

    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <Dropdown {...register(name, { required })} defaultValue={defaultValue} options={options}
                      onChange={handleDropdownChange}
            />
        </div>
    );
};

export { LabelAndDropdown };
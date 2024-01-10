// LabelAndDropdownText.tsx
import React from 'react';
import {Dropdown} from "@/components/Dropdown";

interface LabelAndDropdownProps {
    label: string;
    name: string;
    defaultValue : string ;
    options: { value: string|boolean; label: string }[] | undefined;
    register: any;
    required?: boolean;
}

const LabelAndDropdown: React.FC<LabelAndDropdownProps> = ({ label, name, defaultValue,options, register, required = false }) => {
    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <Dropdown {...register(name, { required })} defaultValue={defaultValue} options={options} />
        </div>
    );
};

export { LabelAndDropdown };
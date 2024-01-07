// LabelAndDropdownText.tsx
import React from 'react';
import {Dropdown} from "@/components/Dropdown";

interface LabelAndDropdownProps {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    register: any;
    required?: boolean;
}

const LabelAndDropdown: React.FC<LabelAndDropdownProps> = ({ label, name, options, register, required = false }) => {
    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <Dropdown {...register(name, { required })} options={options} />
        </div>
    );
};

export { LabelAndDropdown };
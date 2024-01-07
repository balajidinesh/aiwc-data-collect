// LabelAndDropdownState.tsx
import React from 'react';
import { Dropdown } from './Dropdown';

interface LabelAndDropdownStateProps {
    label: string;
    options: { value: string; label: string }[];
    selectedValue: string;
    onSelectChange: (value: string) => void;
}

const LabelAndDropdownState: React.FC<LabelAndDropdownStateProps> = ({ label, options, selectedValue, onSelectChange }) => {
    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <Dropdown value={selectedValue} onChange={(e) => onSelectChange(e.target.value)} options={options} />
        </div>
    );
};

export { LabelAndDropdownState };

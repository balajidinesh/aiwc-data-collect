// LabelAndDropdownState.tsx
import React,{ ChangeEvent} from 'react';
import { Dropdown } from './Dropdown';

interface LabelAndDropdownStateProps {
    label: string;
    options: { value: string; label: string }[];
    selectedValue: string;
    onSelectChange: (value: string) => void;
}

const LabelAndDropdownState: React.FC<LabelAndDropdownStateProps> = ({ label, options, selectedValue, onSelectChange }) => {


    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onSelectChange(e.target.value);
    };



    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <Dropdown value={selectedValue} onChange={handleSelectChange} options={options} />
        </div>
    );
};

export { LabelAndDropdownState };



// LabelAndTextInput.tsx
import React,{ChangeEvent} from 'react';
import {Input} from "@/components/non form ui/Input";

interface LabelAndTextInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    inputClassName?: string; // Optional input class name prop
}


const LabelAndTextInput: React.FC<LabelAndTextInputProps> = ({ label, value, onChange, inputClassName }) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            {/* Apply inputClassName to the Input component */}
            <Input type="text" value={value} onChange={handleInputChange} className={inputClassName} />
        </div>
    );
};

export { LabelAndTextInput };


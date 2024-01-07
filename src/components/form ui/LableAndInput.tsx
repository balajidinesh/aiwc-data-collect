
// LabelAndInput.tsx
import React from 'react';
import {Input} from "@/components/Input";

interface LabelAndInputProps {
    label: string;
    name: string;
    type: string;
    register: any;
    required?: boolean;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({ label, name, type, register, required = false }) => {
    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <Input {...register(name, { required })} type={type} required={required} />
        </div>
    );
};

export { LabelAndInput };
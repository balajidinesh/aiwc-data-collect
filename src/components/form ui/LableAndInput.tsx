
// LabelAndInput.tsx
import React from 'react';
import {Input} from "@/components/Input";

interface LabelAndInputProps {
    label: string;
    name: string;
    // value?:string;
    type: string;
    defaultValue : string ;
    register: any;
    required?: boolean;
    onChange: ( value : string) => void ;
}

const LabelAndInput: React.FC<LabelAndInputProps> = ({ label, name, defaultValue,type, register, required = false ,onChange }) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        onChange(value);
    };

    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <Input {...register(name, { required })} defaultValue={defaultValue} type={type} required={required}
                   onChange={handleInputChange}
            />
        </div>
    );
};

export { LabelAndInput };

// SwitchToggle.tsx
import React from 'react';
interface SwitchToggleProps {
    id : string ;
    label: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ id ,label, value, onChange }) => {

    return (
        <div className="flex items-center mt-4 mb-4">
            <label className="text-sm text-zinc-800 mr-4">{label}</label>
            <div className="relative inline-block w-10 h-6 mr-2 align-middle select-none">
                <input
                    type="checkbox"
                    id={id}
                    className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${
                        value ? 'checked' : ''
                    }`}
                    checked={value}
                    onChange={() => {onChange(!value)}}
                />
                <label htmlFor={label} className="toggle-label" />
            </div>
            <span className="ml-2 text-zinc-800">{value ? 'Yes' : 'No'}</span>
        </div>
    );
};

export default SwitchToggle;

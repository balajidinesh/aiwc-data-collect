// SectionWrapper.tsx
import React from 'react';

interface SectionWrapperProps {
    label: string;
    children: React.ReactNode;
    bgColor? : string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ label, children, bgColor = 'bg-gray-200' }) => {
    return (
        <div className={`${bgColor} rounded-md p-5 pr-10 mb-4`}>
            <label className="text-sm text-zinc-800 font-bold mb-2">{label}</label>
            {children}
        </div>

    );
};

export { SectionWrapper };

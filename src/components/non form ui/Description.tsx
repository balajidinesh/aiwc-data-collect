

// description .tsx
// LabelAndDescription.tsx
import React from 'react';

interface LabelAndDescriptionProps {
    label: string;
    start : string ;
    description: string;
    onChange: (value: string) => void;
}

const LabelAndDescription: React.FC<LabelAndDescriptionProps> = ({ label, start , description, onChange }) => {
    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <div className=""> {/* Set a fixed width, adjust as needed */}
                <textarea
                    value={start != '' ? start : description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
                    className="w-full h-auto rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
};

export { LabelAndDescription };

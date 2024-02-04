

// description .tsx
// LabelAndDescription.tsx
import React, {useEffect, useState} from 'react';

interface LabelAndDescriptionProps {
    label: string;
    start : string ;
    description: string;
    onChange: (value: string) => void;
}

const LabelAndDescription: React.FC<LabelAndDescriptionProps> = ({ label, start , description, onChange }) => {

    const [text , setText] = useState<string>(start != '' ? start : '') ;

    useEffect(() => {
        setText(start != '' ? start : '')
    }, [start]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedText =e.target.value;
        setText(updatedText);
        onChange(updatedText);

    };

    return (
        <div className="mt-4">
            <label className="text-sm text-zinc-800">{label}:</label>
            <div className=""> {/* Set a fixed width, adjust as needed */}
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    className="w-full min-h-14 h-auto my-2 rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
};

export { LabelAndDescription };

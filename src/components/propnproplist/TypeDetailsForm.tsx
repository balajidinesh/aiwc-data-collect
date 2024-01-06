// components/TypeDetailsForm.tsx
import React, { useState } from 'react';

interface TypeDetails {
    characterName: string;
    scale: string;
    value: string;
}

interface TypeDetailsFormProps {
    onAdd: (typeDetails: TypeDetails) => void;
}

const TypeDetailsForm: React.FC<TypeDetailsFormProps> = ({ onAdd }) => {
    const [characterName, setCharacterName] = useState('');
    const [scale, setScale] = useState('');
    const [value, setValue] = useState('');

    const handleAdd = () => {
        if (characterName && scale && value) {
            onAdd({ characterName, scale, value });
            setCharacterName('');
            setScale('');
            setValue('');
        }
    };

    return (
        <div>
            <label>Character Name:</label>
            <input type="text" value={characterName} onChange={(e) => setCharacterName(e.target.value)} />

            <label>Scale:</label>
            <input type="text" value={scale} onChange={(e) => setScale(e.target.value)} />

            <label>Value:</label>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />

            <button type="button" onClick={handleAdd}>
                Add
            </button>
        </div>
    );
};

export default TypeDetailsForm;

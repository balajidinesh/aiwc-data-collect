// TagInput.tsx
import React, { useState } from 'react';

interface TagInputProps {
    name : string
    labelName : string
    onTagsChange: (tags: string[],name) => void;
}

const TagInput: React.FC<TagInputProps> = ({ name,labelName , onTagsChange }) => {
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            addTag();
        } else if (event.key === 'Backspace' && inputValue === '') {
            removeLastTag();
        }
    };

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            setTags([...tags, trimmedValue]);
            onTagsChange([...tags, trimmedValue]);
            setInputValue('');
        }
    };

    const removeLastTag = () => {
        if (inputValue === '' && tags.length > 0) {
            const newTags = [...tags];
            newTags.pop();
            setTags(newTags);
            onTagsChange(newTags);
        }
    };

    return (
        <div className="mb-4">
            <label className="text-sm text-zinc-800 mb-2 mt-4">{labelName}</label>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-blue-400 rounded-md p-2 flex items-center">
                        <span className="mr-2">{tag}</span>
                        <button
                            type="button"
                            onClick={() => {
                                const newTags = [...tags];
                                newTags.splice(index, 1);
                                setTags(newTags);
                                onTagsChange(newTags,name);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="flex-grow h-10 rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
            </div>
        </div>
    );
};

export default TagInput;

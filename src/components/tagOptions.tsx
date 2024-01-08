// TagOptions.tsx
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

interface TagOptionsProps {
    name: string;
    labelName: string;
    options: { value: string; label: string }[];
    defValues: string[];
    inState: boolean;
    onTagsChange: (tags: string[], name: string) => void;
}

const TagOptions: React.FC<TagOptionsProps> = ({
                                                   name,
                                                   labelName,
                                                   options,
                                                   defValues,
                                                   inState,
                                                   onTagsChange,
                                               }) => {
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState<string[]>(inState ? defValues : []);
    const [suggestedOptions, setSuggestedOptions] = useState<{ value: string; label: string }[]>(options);

    useEffect(() => {
        // Update form fields when defValues change
        if (inState) {
            setTags(defValues);
            setInputValue('');
        }
    }, [defValues]);

    const handleInputChange = (inputText: string) => {
        setInputValue(inputText);

        // Filter options based on input text
        const filteredOptions = options.filter((option) =>
            option.label.toLowerCase().includes(inputText.toLowerCase())
        );

        setSuggestedOptions(filteredOptions);
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
            onTagsChange([...tags, trimmedValue], name);
            setInputValue('');
        }
    };

    const removeLastTag = () => {
        if (inputValue === '' && tags.length > 0) {
            const newTags = [...tags];
            newTags.pop();
            setTags(newTags);
            onTagsChange(newTags, name);
        }
    };

    const handleOptionClick = (selectedOption: { value: string; label: string }) => {
        setTags([...tags, selectedOption.value]);
        onTagsChange([...tags, selectedOption.value], name);
        setInputValue('');
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
                                onTagsChange(newTags, name);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
                <Select
                    options={suggestedOptions}
                    value={null} // Clear the value to show a placeholder
                    onChange={(selectedOption: any) => handleOptionClick(selectedOption)}
                    onInputChange={(inputText: string) => handleInputChange(inputText)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Type to add tags"
                    isClearable
                    isMulti
                />
            </div>
        </div>
    );
};

export default TagOptions;

import React, { useEffect, useState } from 'react';

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
    const [selectedOptions, setSelectedOptions] = useState<string[]>(inState ? defValues : []);
    const [suggestedOptions, setSuggestedOptions] = useState<{ value: string; label: string }[]>(options);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        // Update form fields when defValues change
        if (inState) {
            setSelectedOptions(defValues);
            setInputValue('');
        }
    }, [defValues]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = event.target.value;
        setInputValue(inputText);

        // Filter options based on input text
        const filteredOptions = options.filter(
            (option) =>
                option.label.toLowerCase().includes(inputText.toLowerCase()) &&
                !selectedOptions.includes(option.value) // Exclude already selected options
        );
        if (filteredOptions.length !== 0){
            setSuggestedOptions(filteredOptions);
            setShowSuggestions(true);
        }else{setShowSuggestions(false);}
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            if (showSuggestions && suggestedOptions.length > 0) {
                // If suggestions are shown and there are suggestions available, select the first one
                handleOptionClick(suggestedOptions[0]);
            } else {
                // If no suggestions, add the tag
                addTag();
            }
        } else if (event.key === 'Backspace' && inputValue === '') {
            removeLastTag();
        }
    };


    const addTag = () => {
        const trimmedValue = inputValue.trim();
        const isValidOption = options.some((option) => option.value === trimmedValue);

        if (trimmedValue && !selectedOptions.includes(trimmedValue) && isValidOption) {
            setSelectedOptions([...selectedOptions, trimmedValue]);
            onTagsChange([...selectedOptions, trimmedValue], name);
            setInputValue('');
            setShowSuggestions(false);
        }
    };

    const removeLastTag = () => {
        if (inputValue === '' && selectedOptions.length > 0) {
            const newTags = [...selectedOptions];
            newTags.pop();
            setSelectedOptions(newTags);
            onTagsChange(newTags, name);
        }
    };

    const handleOptionClick = (selectedOption: { value: string; label: string }) => {
        setSelectedOptions([...selectedOptions, selectedOption.value]);
        onTagsChange([...selectedOptions, selectedOption.value], name);
        setInputValue('');
        setShowSuggestions(false);
    };

    return (
        <div className="mb-4 relative">
            <label className="text-sm text-zinc-800 mb-2 mt-4">{labelName}</label>
            <div className="flex flex-wrap gap-2 mb-4">
                {/* Display selected options */}
                {selectedOptions.map((tag, index) => (
                    <div key={index} className="bg-blue-400 rounded-md p-2 flex items-center">
                        <span className="mr-2">{tag}</span>
                        <button
                            type="button"
                            onClick={() => {
                                const newTags = [...selectedOptions];
                                newTags.splice(index, 1);
                                setSelectedOptions(newTags);
                                onTagsChange(newTags, name);
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    className="w-full h-10 rounded-md text-zinc-800 border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
                {showSuggestions && (
                    <div className="mt-1 left-0 w-full border border-zinc-800 bg-white">
                        {suggestedOptions.map((option) => (
                            <div
                                key={option.value}
                                className="cursor-pointer p-2 hover:bg-blue-200"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default TagOptions;

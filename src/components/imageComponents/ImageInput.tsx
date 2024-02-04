// components/ImageInput.tsx

import React from 'react';

interface ImageInputProps {
    name: string;
    labelName: string;
    defValues: string ; // Assuming this will be used for default image URLs
    inState: boolean;
    isMultiple?:boolean;
    onImagesChange: (images: string, name: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({
                                                   name,
                                                   labelName,
                                                   defValues,
                                                   inState,
                                                    isMultiple,
                                                   onImagesChange
                                               }) => {
    // You can add your component logic here

    return (
        <div>
            {/* Your ImageInput component JSX goes here */}
            {/* For now, let's keep it empty */}
        </div>
    );
};

export default ImageInput;

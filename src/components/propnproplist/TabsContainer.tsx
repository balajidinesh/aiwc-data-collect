// components/TabsContainer.tsx
import { useState } from 'react';
import TypeDetailsForm from "@/components/propnproplist/TypeDetailsForm";

interface TypeDetails {
    characterName: string;
    scale: string;
    value: string;
}

const TabsContainer: React.FC = () => {
    const [typeDetailsList, setTypeDetailsList] = useState<TypeDetails[]>([]);

    const handleAddTypeDetails = (typeDetails: TypeDetails) => {
        setTypeDetailsList([...typeDetailsList, typeDetails]);
    };

    const handleRemoveTypeDetails = (index: number) => {
        const newList = [...typeDetailsList];
        newList.splice(index, 1);
        setTypeDetailsList(newList);
    };

    return (
        <div>
            <TypeDetailsForm onAdd={handleAddTypeDetails} />

            {typeDetailsList.map((typeDetails, index) => (
                <div key={index} className="tab" onClick={() => console.log('Clicked on tab', index)}>
                    <span>{`${typeDetails.characterName} (${typeDetails.scale}): ${typeDetails.value}`}</span>
                    <button type="button" onClick={() => handleRemoveTypeDetails(index)}>
                        X
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TabsContainer;

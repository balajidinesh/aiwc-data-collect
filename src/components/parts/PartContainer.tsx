import React, {useEffect, useState} from 'react';
import PartDetailsForm from "@/components/parts/PartDetailsForm";
import {PartDetailsProps, TypeDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";

interface PartContainerProps {
    onListChange: (list: PartDetailsProps[]) => void;
}

const DefaultEmptyValues: PartDetailsProps = {
    typeName: "" , // Name of the part or mark
    isVaries: false , // If the same part or mark varies significantly due to constraints like age, puberty, gender
    variedBy: "" , // Attribute by which it varies (e.g., SexMale)
    imageUrls: [], // Images of the part
    typeDetails: [],
    identifications: {
        visualMarks: "", // Pattern, scales, color
        description: "", // Descriptive text of the pattern
        keywords: [], // Keywords from the description
    },
};

const PartContainer: React.FC<PartContainerProps> = ({ onListChange }) => {
    const [partDetailsList, setPartDetailsList] = useState<PartDetailsProps[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddPartDetails = (typeDetails: PartDetailsProps) => {
        const updatedList = [...partDetailsList];
        if (editingIndex !== null) {
            updatedList[editingIndex] = typeDetails; // Update existing tab
        } else {
            updatedList.push(typeDetails); // Add new tab
        }
        setPartDetailsList(updatedList);
        setEditingIndex(null); // Reset editing index after update

    };

    useEffect(() => {
        onListChange(partDetailsList)
    }, [onListChange, partDetailsList]);
    const handleEditPartDetails = (index: number) => {
        const typeDetails = partDetailsList[index];
        setEditingIndex(index);

        // setTypeDetailsList(updatedList);
    };

    const handleRemovePartDetails = (index: number) => {
        if (editingIndex == index){
            setEditingIndex(null)
        }
        const newList = [...partDetailsList];
        newList.splice(index, 1);
        setPartDetailsList(newList);
        onListChange(newList);
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {partDetailsList.map((typeDetails, index) => (
                    <div key={index} className="bg-blue-400 rounded-md p-2 flex items-center">
                        <span className="text-white">{`${index + 1}`}</span>
                        <button
                            type="button"
                            onClick={() => handleEditPartDetails(index)}
                            className="ml-3 text-blue-600 hover:text-blue-500"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRemovePartDetails(index)}
                            className="ml-3 text-red-600 hover:text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <PartDetailsForm inState={editingIndex !== null} defValues={
                editingIndex !== null
                    ?partDetailsList[editingIndex] : DefaultEmptyValues} onAdd={handleAddPartDetails} />
            {/*partDetailsList[editingIndex] :*/}
        </div>
    );
};

export default PartContainer;

import React, {useEffect, useState} from 'react';
import PartDetailsForm, {partDetailsFormProps} from "@/components/parts/PartDetailsForm";
import {PartDetailsProps, TypeDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";

interface PartContainerProps {
    defValues : PartDetailsProps[];
    inState : boolean;
    onListChange: (list: PartDetailsProps[]) => void;
}


const PartContainer: React.FC<PartContainerProps> = ({defValues,inState ,onListChange }) => {
    const [partDetailsList, setPartDetailsList] = useState<PartDetailsProps[]>(inState ? defValues : []);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);



    useEffect(() => {
        onListChange(partDetailsList);
    }, [onListChange, partDetailsList]);


    useEffect(() => {
        // Update form fields when defValues change
        if (inState) {
            setPartDetailsList(defValues)
        }
    }, [defValues]);

    const handleAddPartDetails = (partDetails: PartDetailsProps) => {
        const updatedList = [...partDetailsList];
        if (editingIndex !== null) {
            updatedList[editingIndex] = partDetails; // Update existing tab
            setEditingIndex(null); // Reset editing index after update
        } else {
            updatedList.push(partDetails); // Add new tab
        }
        setPartDetailsList(updatedList);

    };

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
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {partDetailsList.map((typeDetails, index) => (
                    <div key={index} className="bg-blue-400 rounded-md p-2 flex items-center">
                        <span className="text-white">{`${partDetailsList[index].typeName}`}</span>
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
            <PartDetailsForm onEdit={editingIndex !== null} defValues={
                editingIndex !== null
                    ?partDetailsList[editingIndex] : {
                        typeName: "" , // Name of the part or mark
                        isVaries: true , // If the same part or mark varies significantly due to constraints like age, puberty, gender
                        variedBy: "" , // Attribute by which it varies (e.g., SexMale)
                        imageUrls: [], // Images of the part
                        typeDetails: [],
                        identifications: {
                            visualMarks: "", // Pattern, scales, color
                            description: "", // Descriptive text of the pattern
                            keywords: [], // Keywords from the description
                        }}
            } onAdd={handleAddPartDetails}></PartDetailsForm>
            {/*partDetailsList[editingIndex] :*/}
        </div>
    );
};

export default PartContainer;

import React, {useEffect, useState} from 'react';
import {TypeDetailsForm} from "@/components/TypeDetails/typeDetailsForm";
import {TypeDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";

interface TypeContainerProps {
    onEdit : boolean;
    defValues : TypeDetailsProps[];
    onListChange: (list: TypeDetailsProps[]) => void;
}

const DefaultEmptyValues: TypeDetailsProps = {
    characterName: '',
    scale: '',
    value: '',
};

const TypeContainer: React.FC<TypeContainerProps> = ({ onEdit,defValues, onListChange }) => {
    const [typeDetailsList, setTypeDetailsList] = useState<TypeDetailsProps[]>(onEdit? (defValues ?? []):[] );
    const [editingIndex, setEditingIndex] = useState<number | null>(null);


    // useEffect(() => {
    //     onListChange(typeDetailsList);
    //     console.log("useEffect")
    // }, [typeDetailsList]);



    useEffect(() => {
        // if (onEdit) {
            setTypeDetailsList(defValues);
    }, [onEdit,defValues]);


    const handleAddTypeDetails = (typeDetails: TypeDetailsProps) => {
        const updatedList = [...typeDetailsList]
        if (editingIndex !== null) {
            updatedList[editingIndex] = typeDetails; // Update existing tab
            setEditingIndex(null); // Reset editing index after update
        } else {
            updatedList.push(typeDetails); // Add new tab
        }
        setTypeDetailsList(updatedList);
        onListChange(updatedList);
    };

    const handleEditTypeDetails = (index: number) => {
        setEditingIndex(index);
    };

    const handleRemoveTypeDetails = (index: number) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this property?");

        if (isConfirmed) {
            if (editingIndex == index) {
                setEditingIndex(null)
            }
            const newList = [...typeDetailsList];
            newList.splice(index, 1);
            setTypeDetailsList(newList);
            onListChange(newList);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {typeDetailsList && typeDetailsList.map((typeDetails, index) => (
                    <div key={index} className="bg-blue-400 rounded-md p-2 flex items-center">
                        <span className="text-white">{`${typeDetailsList[index].characterName}${typeDetailsList[index].scale?' '+typeDetailsList[index].scale:''}`}</span>
                        <button
                            type="button"
                            onClick={() => handleEditTypeDetails(index)}
                            className="ml-3 text-blue-600 hover:text-blue-500"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRemoveTypeDetails(index)}
                            className="ml-3 text-red-600 hover:text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <TypeDetailsForm onEdit={editingIndex !== null} defValues={
                editingIndex !== null
                    ? (typeDetailsList[editingIndex] ?? DefaultEmptyValues ) : DefaultEmptyValues } onAdd={handleAddTypeDetails} ></TypeDetailsForm>
        </div>
    );
};

export default TypeContainer;

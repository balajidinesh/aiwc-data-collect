import React, {useEffect, useState} from 'react';
import {ArticleDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import HarvestDetailsForm from "@/components/harvestedArticles/harvestDetailsForm";

interface ArticleContainerProps {
    defValues : ArticleDetailsProps[];
    inState : boolean;
    onListChange: (list: ArticleDetailsProps[]) => void;
}


const HarvestContainer: React.FC<ArticleContainerProps> = ({defValues,inState ,onListChange }) => {
    const [articleDetailsList, setArticleDetailsList] = useState<ArticleDetailsProps[]>(inState ? defValues : []);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);


    useEffect(() => {
        onListChange(articleDetailsList);
    }, [onListChange, articleDetailsList]);


    useEffect(() => {
        // Update form fields when defValues change
        if (inState) {
            setArticleDetailsList(defValues)
        }
    }, [defValues, inState]);

    const handleAddArticleDetails = (articleDetails: ArticleDetailsProps) => {
        const updatedList = [...articleDetailsList];
        if (editingIndex !== null) {
            updatedList[editingIndex] = articleDetails; // Update existing tab
            setEditingIndex(null); // Reset editing index after update
        } else {
            updatedList.push(articleDetails); // Add new tab
        }
        setArticleDetailsList(updatedList);

    };

    const handleEditArticleDetails = (index: number) => {
        // const typeDetails = articleDetailsList[index];
        setEditingIndex(index);

        // setTypeDetailsList(updatedList);
    };

    const handleRemoveArticleDetails = (index: number) => {
        const isConfirmed = window.confirm("Are you sure you want to remove this article?");

        if (isConfirmed) {
            if (editingIndex == index) {
                setEditingIndex(null)
            }
            const newList = [...articleDetailsList];
            newList.splice(index, 1);
            setArticleDetailsList(newList);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {articleDetailsList.map((typeDetails, index) => (
                    <div key={index} className="bg-blue-400 rounded-md p-2 flex items-center">
                        <span className="text-white">{`${articleDetailsList[index].articleName}${(articleDetailsList[index].isVaries && articleDetailsList[index].variedBy)?(" "+articleDetailsList[index].variedBy):''}`}</span>
                        <button
                            type="button"
                            onClick={() => handleEditArticleDetails(index)}
                            className="ml-3 text-blue-600 hover:text-blue-500"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRemoveArticleDetails(index)}
                            className="ml-3 text-red-600 hover:text-red-500"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <HarvestDetailsForm onEdit={editingIndex !== null} defValues={
                editingIndex !== null
                    ?articleDetailsList[editingIndex] : {
                        articleName: "" , // Name of the part or mark
                        isHarvested: false, // Is the animal likely to be killed or farmed
                        alternateName: "", // Any known local name
                        isVaries: false , // If the same part or mark varies significantly due to constraints like age, puberty, gender
                        variedBy: "" , // Attribute by which it varies (e.g., SexMale)
                        imageUrls: "",
                        typeDetails: [],
                        identifications: {
                            visualMarks: "", // Pattern, scales, color
                            describe: "", // Descriptive text of the pattern
                            keywords: [], // Keywords from the description
                        },
                    }
            } onAdd={handleAddArticleDetails}></HarvestDetailsForm>
            {/*articleDetailsList[editingIndex] :*/}
        </div>
    );
};

export default HarvestContainer;



import React, { useState, useEffect } from 'react';
import { LabelAndTextInput } from "@/components/non form ui/LabelAndTextInput";
import {LabelAndDropdownState} from "@/components/non form ui/LabelAndDropdownText";
import {PartDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import {TypeDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import {BoolOption} from "../../../models/IntefacesAndOptions/option";
import {ScaleOptions} from "../../../models/IntefacesAndOptions/option";
import {SectionWrapper} from "@/components/SectionWrapper";
import TagInput from "@/components/TagInput";
import TypeContainer from "@/components/parts/TypeDetails/typeContainer";


export interface partDetailsFormProps {
    defValues: PartDetailsProps;
    inState : boolean ;
    onEdit : boolean ;
    onAdd: (partDetails: PartDetailsProps) => void;
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

const partDetailsForm: React.FC<partDetailsFormProps> = ({ inState,onEdit, defValues, onAdd }) => {

    const [typeName, setTypeName] = useState( defValues.typeName );
    const [isVaries, setIsVaries] = useState( defValues.isVaries );
    const [variedBy, setVariedBy] = useState( defValues.variedBy );
    const [imageUrls, setImageUrls] = useState( defValues.imageUrls );
    const [typeDetails, setTypeDetails] = useState<TypeDetailsProps[]>( defValues.typeDetails);
    const [visualMarks, setVisualMarks] = useState(defValues.identifications.visualMarks );
    const [description, setDescription] = useState(defValues.identifications.description );
    const [keywords, setKeywords] = useState<string[]>(defValues.identifications.keywords);


    useEffect(() => {
        // Update form fields when defValues change
        if (onEdit) {
            setTypeName(defValues.typeName);
            setIsVaries(defValues.isVaries);
            setVariedBy(defValues.variedBy);
            setImageUrls(defValues.imageUrls);
            setTypeDetails(defValues.typeDetails);
            setVisualMarks(defValues.identifications.visualMarks);
            setDescription(defValues.identifications.description);
            setKeywords(defValues.identifications.keywords);
            console.log("inside pdf : ")
        }else{
            resetForm();
        }
    }, [onEdit, defValues]);

    const resetForm =( ) =>{

        setTypeName("");
        setIsVaries(false);
        setVariedBy("");
        setImageUrls([]);
        setTypeDetails([]);
        setVisualMarks("");
        setDescription("");
        setKeywords([]);

    }

    // useEffect(() => {
    //     console.log("finally")
    //     console.log(typeDetails)
    // }, [typeDetails]);

    const handleAdd = () => {
        if (typeName && variedBy && visualMarks) {
            onAdd({
                typeName,
                isVaries,
                variedBy,
                imageUrls,
                typeDetails : [...typeDetails],
                identifications: {
                    visualMarks,
                    description,
                    keywords : [...keywords],
                },
            });

            resetForm();

            // defValues  = DefaultEmptyValues;

        }
    };

    const handleKeywordsChange = (tags: string[] , name : string) => {
        // console.log(handleKeywordsChange);
        setKeywords(tags);
    };
    const handleTypeDetailsChange = (newPropsList: TypeDetailsProps[]) => {
        setTypeDetails(newPropsList);
        // console.log("handleTypeDetailsChange")
    };


    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                <LabelAndTextInput label="Type Name" value={typeName} onChange={setTypeName}></LabelAndTextInput>
                <LabelAndDropdownState label="Is Varies" options={BoolOption} selectedValue={isVaries} onSelectChange={setIsVaries}></LabelAndDropdownState>
                <LabelAndTextInput label="Varied By" value={variedBy} onChange={setVariedBy}></LabelAndTextInput>
            </div>

            {/* Leave imageUrls for now - TODO */}
            <SectionWrapper label={"Part Properties"} bgColor={"bg-fuchsia-200"}>
            <TypeContainer isNew={!onEdit} onEdit={onEdit} defValues={
                inState
                    ? defValues.typeDetails : typeDetails }
                           onListChange={handleTypeDetailsChange} ></TypeContainer>
            </SectionWrapper>


            <SectionWrapper label="Identification" bgColor="bg-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                    <LabelAndTextInput label="Visual Marks" value={visualMarks} onChange={setVisualMarks}></LabelAndTextInput>
                    <LabelAndTextInput label="Description" value={description} onChange={setDescription}></LabelAndTextInput>
                </div>
                <TagInput inState={true} defValues={ inState
                    ? defValues.identifications.keywords : keywords }
                          onTagsChange={handleKeywordsChange} name="identifications.keywords" labelName="Keywords"/>
            </SectionWrapper>
            <button
                className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-800"
                type="button"
                onClick={handleAdd}
            >
                {onEdit ? "Update" : "Add"}
            </button>
        </div>
    );
};

export default partDetailsForm;

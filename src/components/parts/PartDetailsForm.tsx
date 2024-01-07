

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

const partDetailsForm: React.FC<partDetailsFormProps> = ({ inState, defValues, onAdd }) => {

    const [typeName, setTypeName] = useState(inState ? defValues.typeName : '');
    const [isVaries, setIsVaries] = useState(inState ? defValues.isVaries : false);
    const [variedBy, setVariedBy] = useState(inState ? defValues.variedBy : '');
    const [imageUrls, setImageUrls] = useState(inState ? defValues.imageUrls : []);
    const [typeDetails, setTypeDetails] = useState<TypeDetailsProps[]>(inState ? defValues.typeDetails : []);
    const [visualMarks, setVisualMarks] = useState(inState ? defValues.identifications.visualMarks : '');
    const [description, setDescription] = useState(inState ? defValues.identifications.description : '');
    const [keywords, setKeywords] = useState(inState ? defValues.identifications.keywords : []);



    const handleAdd = () => {
        if (typeName && variedBy && visualMarks) {
            onAdd({
                typeName,
                isVaries,
                variedBy,
                imageUrls,
                typeDetails,
                identifications: {
                    visualMarks,
                    description,
                    keywords,
                },
            });

            setTypeName('');
            setIsVaries(false);
            setVariedBy('');
            setImageUrls([]);
            setTypeDetails([]);
            setVisualMarks('');
            setDescription('');
            setKeywords([]);

            defValues  = DefaultEmptyValues;

        }
    };

    const handleKeywordsChange = (tags: string[] , name : string) => {
        console.log(tags);
        setKeywords(tags);
    };
    const handleTypeDetailsChange = (newPropsList: TypeDetailsProps[]) => {
        setTypeDetails(newPropsList);
        console.log(newPropsList)
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
            <TypeContainer inState={inState !== null} defValues={
                inState !== null
                    ? defValues.typeDetails : [] } onListChange={handleTypeDetailsChange} ></TypeContainer>
            </SectionWrapper>


            <SectionWrapper label="Identification" bgColor="bg-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                    <LabelAndTextInput label="Visual Marks" value={visualMarks} onChange={setVisualMarks}></LabelAndTextInput>
                    <LabelAndTextInput label="Description" value={description} onChange={setDescription}></LabelAndTextInput>
                </div>
                <TagInput inState={inState !== null} defValues={ inState !== null
                    ? defValues.identifications.keywords : [] } onTagsChange={handleKeywordsChange} name="identifications.keywords" labelName="Keywords"/>
            </SectionWrapper>
            <button
                className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-green active:bg-green-800"
                type="button"
                onClick={handleAdd}
            >
                {inState ? "Update" : "Add"}
            </button>
        </div>
    );
};

export default partDetailsForm;

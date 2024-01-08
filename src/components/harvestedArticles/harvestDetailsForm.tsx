

import React, { useState, useEffect } from 'react';
import { LabelAndTextInput } from "@/components/non form ui/LabelAndTextInput";
import {LabelAndDropdownState} from "@/components/non form ui/LabelAndDropdownText";
import {ArticleDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import {TypeDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import {BoolOption} from "../../../models/IntefacesAndOptions/option";
import {ScaleOptions} from "../../../models/IntefacesAndOptions/option";
import {SectionWrapper} from "@/components/SectionWrapper";
import TagInput from "@/components/TagInput";
import TypeContainer from "@/components/harvestedArticles/TypeDetails/typeContainer";
import {bool} from "prop-types";
import {LabelAndDescription} from "@/components/non form ui/Description";

export interface harvestDetailsFormProps {
    defValues: ArticleDetailsProps;
    onEdit : boolean ;
    onAdd: (partDetails: ArticleDetailsProps) => void;
}

const DefaultEmptyValues: ArticleDetailsProps = {
    articleName: "" , // Name of the part or mark
    isHarvested: false, // Is the animal likely to be killed or farmed
    alternateName: "", // Any known local name
    isVaries: false , // If the same part or mark varies significantly due to constraints like age, puberty, gender
    variedBy: "" , // Attribute by which it varies (e.g., SexMale)
    imageUrls: [], // Images of the part
    typeDetails: [],
    identifications: {
        visualMarks: "", // Pattern, scales, color
        describe: "", // Descriptive text of the pattern
        keywords: [], // Keywords from the description
    },
};

const harvestDetailsForm: React.FC<harvestDetailsFormProps> = ({ onEdit, defValues, onAdd }) => {

    const [articleName, setArticleName] = useState( defValues.articleName );
    const [isHarvested, setIsHarvested] = useState( defValues.isHarvested );
    const [alternateName, setAlternateName] = useState( defValues.alternateName );
    const [isVaries, setIsVaries] = useState( defValues.isVaries );
    const [variedBy, setVariedBy] = useState( defValues.variedBy );
    const [imageUrls, setImageUrls] = useState( defValues.imageUrls );
    const [typeDetails, setTypeDetails] = useState<TypeDetailsProps[]>( defValues.typeDetails);
    const [visualMarks, setVisualMarks] = useState(defValues.identifications.visualMarks );
    const [describe, setDescribe] = useState(defValues.identifications.describe );
    const [keywords, setKeywords] = useState<string[]>(defValues.identifications.keywords);


    useEffect(() => {
        // Update form fields when defValues change
        if (onEdit) {
            setArticleName(defValues.articleName);
            setIsHarvested(defValues.isHarvested);
            setIsVaries(defValues.isVaries);
            setVariedBy(defValues.variedBy);
            setAlternateName(defValues.alternateName)
            setImageUrls(defValues.imageUrls);
            setTypeDetails(defValues.typeDetails);
            setVisualMarks(defValues.identifications.visualMarks);
            setDescribe(defValues.identifications.describe);
            setKeywords(defValues.identifications.keywords);
        }else{
            resetForm();
        }
    }, [onEdit, defValues]);

    const resetForm =( ) =>{

        setArticleName("");
        setIsHarvested(false);
        setIsVaries(false);
        setVariedBy("");
        setAlternateName(defValues.alternateName)
        setImageUrls([]);
        setTypeDetails([]);
        setVisualMarks("");
        setDescribe("");
        setKeywords([]);

    }

    // useEffect(() => {
    //     console.log("finally")
    //     console.log(typeDetails)
    // }, [typeDetails]);

    const handleAdd = () => {
        if (articleName && variedBy && visualMarks) {
            onAdd({
                articleName: articleName,
                isHarvested : isHarvested,
                alternateName : alternateName,
                isVaries : isVaries,
                variedBy : variedBy,
                imageUrls : imageUrls,
                typeDetails : [...typeDetails],
                identifications: {
                    visualMarks : visualMarks,
                    describe: describe,
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto mb-10">
                <LabelAndTextInput label="Type Name" value={articleName} onChange={setArticleName}></LabelAndTextInput>
                <LabelAndDropdownState label="Is Harvested" options={BoolOption} selectedValue={isHarvested} onSelectChange={setIsHarvested}></LabelAndDropdownState>
                <LabelAndDropdownState label="Is Varies" options={BoolOption} selectedValue={isVaries} onSelectChange={setIsVaries}></LabelAndDropdownState>
                <LabelAndTextInput label="Varied By" value={variedBy} onChange={setVariedBy}></LabelAndTextInput>
                <LabelAndTextInput label="Alternate Name" value={alternateName} onChange={setAlternateName}></LabelAndTextInput>
            </div>

            {/* Leave imageUrls for now - TODO */}
            <SectionWrapper label={"Article characteristics"} bgColor={"bg-fuchsia-200"}>
                <TypeContainer onEdit={onEdit} defValues={
                    onEdit
                        ? defValues.typeDetails : typeDetails }
                               onListChange={handleTypeDetailsChange} ></TypeContainer>
            </SectionWrapper>


            <SectionWrapper label="Identification" bgColor="bg-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                    <LabelAndTextInput label="Visual Marks" value={visualMarks} onChange={setVisualMarks}></LabelAndTextInput>

                </div>
                <LabelAndDescription label="Description" description={describe} onChange={setDescribe}></LabelAndDescription>
                <TagInput inState={true} defValues={ onEdit
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

export default harvestDetailsForm;

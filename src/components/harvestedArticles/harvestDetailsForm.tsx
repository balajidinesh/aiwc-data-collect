

import React, { useState, useEffect } from 'react';
import { LabelAndTextInput } from "@/components/non form ui/LabelAndTextInput";
import {ArticleDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import {TypeDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import {SectionWrapper} from "@/components/SectionWrapper";
import TagInput from "@/components/TagInput";
import TypeContainer from "@/components/TypeDetails/typeContainer";
import {LabelAndDescription} from "@/components/non form ui/Description";
import SwitchToggle from "@/components/SwitchToggle";

export interface harvestDetailsFormProps {
    defValues: ArticleDetailsProps;
    onEdit : boolean ;
    onAdd: (partDetails: ArticleDetailsProps) => void;
}

const HarvestDetailsForm: React.FC<harvestDetailsFormProps> = ({ onEdit, defValues, onAdd }) => {

    const [articleName, setArticleName] = useState( defValues.articleName );
    const [isHarvested, setIsHarvested] = useState( defValues.isHarvested );
    const [alternateName, setAlternateName] = useState( defValues.alternateName );
    const [isVaries, setIsVaries] = useState( defValues.isVaries );
    const [variedBy, setVariedBy] = useState( defValues.variedBy );
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
            setAlternateName(defValues.alternateName);
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
        setAlternateName("")
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
        if (articleName && visualMarks) {
            onAdd({
                articleName: articleName,
                isHarvested : isHarvested,
                alternateName : alternateName,
                isVaries : isVaries,
                variedBy : isVaries ? variedBy : '',
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

    const handleKeywordsChange = (tags: string[] ) => {
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
                <LabelAndTextInput label="Article Name" value={articleName} onChange={setArticleName}></LabelAndTextInput>
                <SwitchToggle id="articleharvested" label={"Is Harvested"} value={isHarvested} onChange={setIsHarvested}></SwitchToggle>
                <SwitchToggle id="articlevaries" label="Is Varies" value={isVaries} onChange={setIsVaries}></SwitchToggle>
                {isVaries && (<LabelAndTextInput label="Varied By" value={variedBy} onChange={setVariedBy}></LabelAndTextInput>)}
                <LabelAndTextInput label="Alternate Name" value={alternateName} onChange={setAlternateName}></LabelAndTextInput>
            </div>

            {/* Leave imageUrls for now - TODO */}
            <SectionWrapper label={(articleName?(""+ articleName+" "):"") + "Article Characteristics/Properties"} bgColor={"bg-fuchsia-200"}>
                <TypeContainer onEdit={onEdit} defValues={
                    onEdit
                        ? defValues.typeDetails : typeDetails }
                               onListChange={handleTypeDetailsChange} ></TypeContainer>
            </SectionWrapper>


            <SectionWrapper label="Identification" bgColor="bg-blue-100">
                {/*<div className="mx-auto">*/}
                {/*    </div>*/}
                <LabelAndTextInput label={"Visual Marks"+(articleName?(" of "+ articleName):"")+" "} value={visualMarks} onChange={setVisualMarks} inputClassName={"w-full"}></LabelAndTextInput>
                <LabelAndDescription start={describe} label="Description" description={describe} onChange={setDescribe}></LabelAndDescription>
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

export default HarvestDetailsForm;

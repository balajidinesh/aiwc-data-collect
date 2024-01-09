// createSpecies/CreateSpeciesForm.tsx
"use client";

import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Species } from '@/../models/species';
import React from 'react';
import {LabelAndInput} from "@/components/form ui/LableAndInput";
import {LabelAndDropdown} from "@/components/form ui/LabelAndDropdown";
import {PartDetailsProps,ArticleDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import TagOptions from "@/components/tagOptions";
import TagInput from "@/components/TagInput";
import { submitSpecies } from './submitSpecies';
import {LabelAndDescription} from "@/components/non form ui/Description";
import {SectionWrapper} from "@/components/SectionWrapper"; // Import the server-side submit function
import PartContainer from "@/components/parts/PartContainer";
import HarvestContainer from "@/components/harvestedArticles/harvestContainer";
import {habitatOptions} from "../../../models/IntefacesAndOptions/option";

import {fieldsBody} from "../../../models/IntefacesAndOptions/DefaultValues";
import {DefaultEmptyPartValues} from "../../../models/IntefacesAndOptions/DefaultValues";
import {DefaultEmptyArticleValues} from "../../../models/IntefacesAndOptions/DefaultValues";



interface CreateSpeciesFormProps {
    isInEdit : boolean;
    defValues : Species;
}

type NestedObject = { [key: string]: NestedObject | any };

function getNestedValue(obj: NestedObject, path: string): any {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined), obj);
}


const CreateSpeciesForm: React.FC<CreateSpeciesFormProps> = ({isInEdit=false,defValues}) => {
    const { register, handleSubmit ,setValue,getValues} = useForm<Species>(defValues);
    const router = useRouter();



    const handleTagsChange = (value: string[]) => {
        setValue('body.tags', value);
    };

    const handleSimilarChange = (value: string[]) => {
        setValue('technicals.speciesClass.similaritiesWith', value);
    };


    const handlePartsChange = (parts : PartDetailsProps[]) =>{
        setValue("technicals.parts" ,parts);
    }

    const handleArticleChange = (articles : ArticleDetailsProps[]) =>{
        setValue("technicals.harvestedArticles" , articles);
    }

    const handlePlacesChange = (places: string[]) => {
        // console.log(tags);
        setValue("geoInformation.foundAt.places", places);
    };

    const handleHabitatChange = (habitats: [] ) => {
        // console.log(tags);

        setValue("geoInformation.habitats", habitats);
    };


    const handleDescriptionChange =(description: "") => {
        // console.log(tags);

        setValue("descriptionOrExplanation", description);
    };


    const onSubmit = async (formData: any) => {

        try {
            console.log(formData)
            await submitSpecies(formData);
            //
            await router.replace('/');
            await router.reload()
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[90vw] mx-auto ">
            
            <SectionWrapper label={"Body"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                {fieldsBody.map((field, index) => (
                    <div key={index}>
                        {field.type === 'text' ? (
                            <LabelAndInput label={field.label} name={field.name} type="text" register={register}
                                           required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : ''}/>
                        ) : field.type === 'dropdown' ? (
                            <LabelAndDropdown label={field.label} name={field.name} options={field.options}
                                              register={register} required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : ''}/>
                        ) : null}
                    </div>
                ))}
            </div>
                <TagInput inState={isInEdit} defValues={isInEdit ? defValues.body.tags : ''} onTagsChange={handleTagsChange} name={'body.tags'} labelName={'Tags'}/>
            </SectionWrapper>

            <SectionWrapper  label={"Morphology"} bgColor={"bg-gray-200"}>

                <SectionWrapper label={"Part Properties"} bgColor={"bg-blue-200"}>
                    <PartContainer defValues={isInEdit? defValues.technicals.parts : DefaultEmptyPartValues} onListChange={handlePartsChange} inState={isInEdit}></PartContainer>
                </SectionWrapper>

                <SectionWrapper label={"Articles"} bgColor={"bg-blue-200"}>
                    <HarvestContainer defValues={isInEdit? defValues.technicals.harvestedArticles : DefaultEmptyArticleValues} onListChange={handleArticleChange} inState={isInEdit}></HarvestContainer>
                </SectionWrapper>

                <TagInput onTagsChange={handleSimilarChange} name={'technicals.speciesClass.similaritiesWith'} labelName={'Similar Species'}  defValues={isInEdit ? defValues.technicals.speciesClass.similaritiesWith : ''} inState={isInEdit}/>
            </SectionWrapper>

            {/*<SwitchToggle label={'hi'} value={tfval} onChange={setTfval}></SwitchToggle>*/}

            <SectionWrapper  label={"Geo Information"} bgColor={"bg-gray-200"}>
                <TagInput inState={isInEdit} defValues={isInEdit ? defValues.geoInformation.foundAt.places : ''} onTagsChange={handlePlacesChange} name={'geoInformation.foundAt.places'} labelName={'Places Found'} />

                <SectionWrapper label={"Part Properties"} bgColor={"bg-blue-200"}>
                   <TagOptions inState={isInEdit} name={'habitats'} labelName={'Select Habitats'} options={habitatOptions}  onTagsChange={handleHabitatChange} defValues={isInEdit ? defValues.geoInformation.habitats : []}></TagOptions>
                </SectionWrapper>

            </SectionWrapper>

            <SectionWrapper  label={"Summary and Miscellaneous Information"} bgColor={"bg-gray-200"}>

                {/*<LabelAndDescription start={describe} label="Description" description={describe} onChange={setDescribe}></LabelAndDescription>*/}
                <LabelAndDescription label="Description" description={getValues('descriptionOrExplanation')} onChange={handleDescriptionChange} start={isInEdit ? defValues.descriptionOrExplanation : ''}></LabelAndDescription>
            </SectionWrapper>

            <div className="mt-5">
                <button type="submit" className="bg-zinc-900 text-white py-2 px-4">
                    Create Species
                </button>
            </div>
        </form>
    );
};

export default CreateSpeciesForm;

// createSpecies/CreateSpeciesForm.tsx
"use client";

import {useForm, UseFormRegister} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {useState} from "react";
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
    // isInEdit : boolean;
}



const CreateSpeciesForm: React.FC<CreateSpeciesFormProps> = () => {
    const { register, handleSubmit, reset ,setValue,getValues} = useForm<Species>();
    const router = useRouter();
    const [propsList, setPropsList] = useState<string[]>([]);
    const [description,setDescription] = useState('');


    const handleTagsChange = (tags: string[] , name : string) => {
        setValue("body.tags", {value:tags});
    };


    const handlePartsChange = (parts : PartDetailsProps[]) =>{
        setValue("technicals.parts" ,{value : parts});
    }

    const handleArticleChange = (articles : ArticleDetailsProps[]) =>{
        setValue("technicals.harvestedArticles" , {value : articles});
    }

    const handlePlacesChange = (places: string[] , name : string) => {
        // console.log(tags);
        setValue("geoInformation.foundAt.places", {value:places});
    };

    const handleHabitatChange = (habitats: [] ) => {
        // console.log(tags);

        setValue("geoInformation.habitats", {value:habitats});
    };


    const handleDescriptionChange =(description: "") => {
        // console.log(tags);

        setValue("descriptionOrExplanation", {value:description});
    };


    const onSubmit = async (formData: any) => {

        try {
            console.log(formData)
            // await submitSpecies(formData);
            //
            // await router.replace('/')
            // await router.reload()
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-[90vw] mx-auto ">
            
            <SectionWrapper label={"Body"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                {fieldsBody.map((field, index) => (
                    <div key={field.name}>
                        {field.type === 'text' ? (
                            <LabelAndInput label={field.label} name={field.name} type="text" register={register}
                                           required={field.required}/>
                        ) : field.type === 'dropdown' ? (
                            <LabelAndDropdown label={field.label} name={field.name} options={field.options}
                                              register={register} required={field.required}/>
                        ) : null}
                    </div>
                ))}
            </div>
                <TagInput onTagsChange={handleTagsChange} name={'body.tags'} labelName={'Tags'}/>
            </SectionWrapper>

            <SectionWrapper  label={"Morphology"} bgColor={"bg-gray-200"}>

                <SectionWrapper label={"Part Properties"} bgColor={"bg-blue-200"}>
                    <PartContainer defValues={DefaultEmptyPartValues} onListChange={handlePartsChange}></PartContainer>
                </SectionWrapper>

                <SectionWrapper label={"Articles"} bgColor={"bg-blue-200"}>
                    <HarvestContainer defValues={DefaultEmptyArticleValues} onListChange={handlePartsChange}></HarvestContainer>
                </SectionWrapper>

                <TagInput onTagsChange={handleTagsChange} name={'technicals.speciesClass.similaritiesWith'} labelName={'Similar Species'} />
            </SectionWrapper>

            {/*<SwitchToggle label={'hi'} value={tfval} onChange={setTfval}></SwitchToggle>*/}

            <SectionWrapper  label={"Geo Information"} bgColor={"bg-gray-200"}>
                <TagInput onTagsChange={handlePlacesChange} name={'places'} labelName={'Places Found'} />

                <SectionWrapper label={"Part Properties"} bgColor={"bg-blue-200"}>
                   <TagOptions name={'habitats'} labelName={'Select Habitats'} options={habitatOptions}  onTagsChange={handleHabitatChange}></TagOptions>
                </SectionWrapper>

            </SectionWrapper>

            <SectionWrapper  label={"Summary and Miscellaneous Information"} bgColor={"bg-gray-200"}>


                <LabelAndDescription label="Description" description={getValues('descriptionOrExplanation')} onChange={handleDescriptionChange}></LabelAndDescription>
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

// createSpecies/CreateSpeciesForm.tsx
"use client";

import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react';
import {LabelAndInput} from "@/components/form ui/LableAndInput";
import {LabelAndDropdown} from "@/components/form ui/LabelAndDropdown";
import {PartDetailsProps, ArticleDetailsProps, TaxonomyProps} from "../../../models/IntefacesAndOptions/interfaces";
import TagOptions from "@/components/tagOptions";
import TagInput from "@/components/TagInput";
import { submitSpecies } from './submitSpecies';
import {LabelAndDescription} from "@/components/non form ui/Description";
import {SectionWrapper} from "@/components/SectionWrapper"; // Import the server-side submit function
import PartContainer from "@/components/parts/PartContainer";
import HarvestContainer from "@/components/harvestedArticles/harvestContainer";
import {habitatOptions} from "../../../models/IntefacesAndOptions/option";

import {
    DefaultEmptyScientificName,
    fieldsBody,
    fieldsScientific,
    fieldsScientificName,
    optionsScientificParts
} from "../../../models/IntefacesAndOptions/DefaultValues";
import {DefaultEmptyPartValues} from "../../../models/IntefacesAndOptions/DefaultValues";
import {DefaultEmptyArticleValues} from "../../../models/IntefacesAndOptions/DefaultValues";
import ImageInput from "@/components/imageComponents/ImageInput";
import {LabelAndDropdownState} from "@/components/non form ui/LabelAndDropdownText";
import ScientificNameForm from "@/components/form ui/scientificName";
// import {slice} from "lodash";

export const revalidate = 0;

interface CreateSpeciesFormProps {
    isInEdit : boolean;
    defValues ?:any;
    idofEdit ?: string;
}

export type NestedObject = { [key: string]: NestedObject | any };

export function getNestedValue(obj: NestedObject, path: string): any {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined), obj);
}


const CreateSpeciesForm: React.FC<CreateSpeciesFormProps> = ({isInEdit=false,defValues,idofEdit}) => {
    const { register, handleSubmit ,setValue,getValues} = useForm();
    const router = useRouter();
    const [scheduleNames, setScheduleNames] = useState<string>(isInEdit ? getNestedValue(defValues, fieldsScientific[0].name) : '');
    const [selectPartSchedule , setPartSchedule] = useState<string>(isInEdit ? getNestedValue(defValues, optionsScientificParts[0].name) : '')
    const [taxonomy, setTaxonomy] = useState(isInEdit ? getNestedValue(defValues,"body.taxonomy") : {})
    // const [snUpdate, setsNUpdate] = useState<number>(0)

    useEffect(() => {
        setScheduleNames(isInEdit ? getNestedValue(defValues, fieldsScientific[0].name) : '')
        setPartSchedule( isInEdit ? getNestedValue(defValues, optionsScientificParts[0].name) : '')
        setTaxonomy( isInEdit ? getNestedValue(defValues, "body.taxonomy") : DefaultEmptyScientificName)

        setValue('body.SchedulePart' ,isInEdit?defValues.body.SchedulePart:'')
        setValue('body.Schedule',isInEdit?defValues.body.Schedule : '')
        setValue('body.taxonomy',isInEdit?defValues.body.taxonomy : DefaultEmptyScientificName)
        setValue('body.mainImageUrls', isInEdit?defValues.body.mainImageUrls :'');
        setValue('body.tags', isInEdit?defValues.body.tags:[]);
        setValue('technicals.similaritiesWith', isInEdit?defValues.technicals.similaritiesWith:[]);
        setValue("technicals.parts", isInEdit?defValues.technicals.parts:[]);
        setValue("technicals.harvestedArticles" , isInEdit?defValues.technicals.harvestedArticles:[]);
        setValue("geoInformation.places", isInEdit?defValues.geoInformation.places:[]);
        setValue("geoInformation.habitats", isInEdit?defValues.geoInformation.habitats:[]);
        setValue("descriptionOrExplanation", isInEdit?defValues.descriptionOrExplanation:'');
    }, [defValues, isInEdit, setValue]);



    const handleScheduleDropdownChange = (value: string) => {
        setScheduleNames(value);
        setValue('body.Schedule',value)
    };

    const handleSchedulePartDropdownChange = (value:string) => {
        setPartSchedule(value);
        setValue('body.SchedulePart',value)
    };

    const get_option_Schedules = () => {
        if (scheduleNames) {

            const selectedScheduleIndex = fieldsScientific[0].options.findIndex(
                (option) => option.value === scheduleNames
            );

            if (selectedScheduleIndex !== -1) {
                return optionsScientificParts[0].options[selectedScheduleIndex]; // Adding 1 because array indices start from 0
            }
        }

        return [];
    };



    const handleImagesChange = (value : string) => {
        setValue('body.mainImageUrls', value);
    }

    const handlePlainChange = (name : string , value:string ) => {
        setValue(name , value) ;
    }
    const handleTagsChange = (value: string[]) => {
        // console.log("u")
        setValue('body.tags', value);
    };

    const handleSimilarChange = (value: string[]) => {
        setValue('technicals.similaritiesWith', value);
    };

    const handleTaxonomyChange = (value : TaxonomyProps) =>{
        setTaxonomy(value)
        setValue("body.taxonomy",value);
    };


    const handlePartsChange = (parts : PartDetailsProps[]) =>{
        setValue("technicals.parts", parts);
    }

    const handleArticleChange = (articles : ArticleDetailsProps[]) =>{
        setValue("technicals.harvestedArticles" , articles);
    }

    const handlePlacesChange = (places: string[]) => {
        // console.log(tags);
        setValue("geoInformation.places", places);

    };

    const handleHabitatChange = (habitats: string[] ) => {
        // console.log(tags);

        setValue("geoInformation.habitats", habitats);
    };


    const handleDescriptionChange =(description: string) => {
        // console.log(tags);

        setValue("descriptionOrExplanation", description);
    };


    const onSubmit = async (formData: any) => {
        try {
            console.log(formData)
            await submitSpecies(formData,idofEdit);

            router.replace('/');
            router.refresh();
            //// await router.reload()
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
                                           required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : ''} onChange={()=>{}}/>
                        ) : field.type === 'dropdown' ? (
                            <LabelAndDropdown label={field.label} name={field.name} options={field.options}
                                              register={register} required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : '' } onChange={()=>{}}/>
                        ) : null}
                    </div>
                ))}
            </div>
                <ImageInput name={"body.mainImageUrls"} labelName={"Uploaded Images"} inState={isInEdit} defValues={isInEdit ?( defValues.body.mainImageUrls ?? []) : []} onImagesChange={handleImagesChange}/>
                <TagInput inState={isInEdit} defValues={isInEdit ?( defValues?.body?.tags ?? []) : []} onTagsChange={handleTagsChange} name={'body.tags'} labelName={'Tags'}/>
            </SectionWrapper>

            <SectionWrapper label={"Scientific Description"} bgColor={"bg-gray-200"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                    <LabelAndDropdownState label={fieldsScientific[0].label} options={fieldsScientific[0].options} onSelectChange={handleScheduleDropdownChange} selectedValue={scheduleNames}/>

                    {<LabelAndDropdownState label={optionsScientificParts[0].label} options={get_option_Schedules()} onSelectChange={handleSchedulePartDropdownChange} selectedValue={selectPartSchedule}/>}

                    {/*{fieldsScientificName.slice(0,-1).map((field, index) => (*/}
                    {/*    <div key={index}>*/}
                    {/*        {field.type === 'text' ? (*/}
                    {/*            <LabelAndInput*/}
                    {/*                label={field.label} name={field.name} type="text" register={register}*/}
                    {/*                required={field.required}*/}
                    {/*                defaultValue={isInEdit ? getNestedValue(defValues,field.name) : ''}*/}
                    {/*                onChange={field.name === 'body.genus' ?*/}
                    {/*                    onGenusChange : field.name === 'body.species' ? onSpeciesChange : ()=>{}}*/}
                    {/*            />*/}
                    {/*        )*/}
                    {/*        //     : field.type === 'dropdown' ? (*/}
                    {/*        //     <LabelAndDropdown label={field.label} name={field.name} options={field}*/}
                    {/*        //                       register={register} required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : '' } onChange={()=>{}}/>*/}
                    {/*        // )*/}
                    {/*            : null}*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
                <ScientificNameForm isInEdit={isInEdit} defValues={isInEdit? (defValues?.body?.taxonomy ?? DefaultEmptyScientificName ): DefaultEmptyScientificName} onTaxonomyChange={handleTaxonomyChange} />
            </SectionWrapper>

            <SectionWrapper label={"Morphology"} bgColor={"bg-gray-200"}>

                <SectionWrapper label={"Species Physical Properties (Visual Anatomy)"} bgColor={"bg-blue-200"}>
                    <PartContainer defValues={isInEdit
                        ? (defValues?.technicals?.parts?.map((part: any) => {
                            // Ensure typeName is a string and not null or undefined
                            return {
                                ...(part.toObject ? part.toObject() : part),
                                typeName: part.typeName || '',
                            };
                        }) ?? [DefaultEmptyPartValues])
                        : [DefaultEmptyPartValues]
                    } onListChange={handlePartsChange} inState={isInEdit}></PartContainer>
                </SectionWrapper>

                <SectionWrapper label={"Species Article Properties"} bgColor={"bg-blue-200"}>
                <HarvestContainer defValues={ isInEdit
                        ? (defValues?.technicals?.harvestedArticles?.map((article: any) => {
                            // Ensure articleName is a string and not null or undefined
                            return {
                                ...(article.toObject ? article.toObject() : article),
                                articleName: article.articleName || '',
                            };
                        }) ?? [DefaultEmptyArticleValues])
                        : [DefaultEmptyArticleValues]} onListChange={handleArticleChange} inState={isInEdit}></HarvestContainer>
                </SectionWrapper>

                <TagInput onTagsChange={handleSimilarChange} name={'technicals.similaritiesWith'} labelName={'Similar Species'}  defValues={isInEdit ? (defValues?.technicals?.similaritiesWith ?? []) : []} inState={isInEdit}/>
            </SectionWrapper>

            {/*<SwitchToggle label={'hi'} value={tfval} onChange={setTfval}></SwitchToggle>*/}

            <SectionWrapper  label={"Geo Information"} bgColor={"bg-gray-200"}>
                <TagInput inState={isInEdit} defValues={isInEdit ?( defValues?.geoInformation?.places ?? ['']) : ['']} onTagsChange={handlePlacesChange} name={'geoInformation.places'} labelName={'Places Found'} />
                <SectionWrapper label={"habitats"} bgColor={"bg-blue-200"}>
                   <TagOptions inState={isInEdit} name={'habitats'} labelName={'Select Habitats'} options={habitatOptions}  onTagsChange={handleHabitatChange} defValues={isInEdit ?( defValues?.geoInformation?.habitats ?? ['']) : ['']}></TagOptions>
                </SectionWrapper>

            </SectionWrapper>

            <SectionWrapper  label={"Summary and Miscellaneous Information"} bgColor={"bg-gray-200"}>

                {/*<LabelAndDescription start={describe} label="Description" description={describe} onChange={setDescribe}></LabelAndDescription>*/}
                <LabelAndDescription label="Description" description={getValues('descriptionOrExplanation')} onChange={handleDescriptionChange} start={isInEdit ?( defValues?.descriptionOrExplanation ?? '') : ''}></LabelAndDescription>
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

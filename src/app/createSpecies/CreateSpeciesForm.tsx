// createSpecies/CreateSpeciesForm.tsx
"use client";

import {useForm} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import React, {useState} from 'react';
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

import {
    fieldsBody,
    fieldsScientific,
    fieldsScientificName,
    optionsScientific
} from "../../../models/IntefacesAndOptions/DefaultValues";
import {DefaultEmptyPartValues} from "../../../models/IntefacesAndOptions/DefaultValues";
import {DefaultEmptyArticleValues} from "../../../models/IntefacesAndOptions/DefaultValues";

export const revalidate = 0;

interface CreateSpeciesFormProps {
    isInEdit : boolean;
    defValues :any;
    idofEdit : string;
}

type NestedObject = { [key: string]: NestedObject | any };

function getNestedValue(obj: NestedObject, path: string): any {
    const keys = path.split('.');
    return keys.reduce((acc, key) => (acc && acc[key] !== 'undefined' ? acc[key] : undefined), obj);
}


const CreateSpeciesForm: React.FC<CreateSpeciesFormProps> = ({isInEdit=false,defValues,idofEdit}) => {
    const { register, handleSubmit ,setValue,getValues} = useForm();
    const router = useRouter();
    const [scheduleNames, setScheduleNames] = useState<string>('');

    const handleScheduleDropdownChange = (value: string) => {
        setScheduleNames(value);
    };

    const get_option_Schedules = () => {
        if (scheduleNames) {

            const selectedScheduleIndex = fieldsScientific[0].options.findIndex(
                (option) => option.value === scheduleNames
            );

            if (selectedScheduleIndex !== -1) {
                return optionsScientific[0].options[selectedScheduleIndex]; // Adding 1 because array indices start from 0
            }
        }

        return [];
    };
    const handleTagsChange = (value: string[]) => {
        setValue('body.tags', value);
    };

    const handleSimilarChange = (value: string[]) => {
        setValue('technicals.similaritiesWith', value);
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
            //
            router.replace('/');
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
                    <div key={index}>
                        {field.type === 'text' ? (
                            <LabelAndInput label={field.label} name={field.name} type="text" register={register}
                                           required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : ''}/>
                        ) : field.type === 'dropdown' ? (
                            <LabelAndDropdown label={field.label} name={field.name} options={field.options}
                                              register={register} required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : '' } onChange={()=>{}}/>
                        ) : null}
                    </div>
                ))}

            </div>
                <TagInput inState={isInEdit} defValues={isInEdit ?( defValues?.body?.tags ?? []) : []} onTagsChange={handleTagsChange} name={'body.tags'} labelName={'Tags'}/>
            </SectionWrapper>

            <SectionWrapper label={"Scientific Description"} bgColor={"bg-gray-200"}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[5vw] mx-auto">
                    <LabelAndDropdown label={fieldsScientific[0].label} name={fieldsScientific[0].name} defaultValue={isInEdit ? getNestedValue(defValues, fieldsScientific[0].name) : ''} register={register} options={fieldsScientific[0].options} onChange={handleScheduleDropdownChange}/>

                    {scheduleNames && <LabelAndDropdown label={fieldsScientific[1].label} name={fieldsScientific[1].name} defaultValue={isInEdit ? getNestedValue(defValues, fieldsScientific[0].name) : ''} options={get_option_Schedules()} register={register}
                                       onChange={()=>{}}/>}

                    {fieldsScientificName.map((field, index) => (
                        <div key={index}>
                            {field.type === 'text' ? (
                                <LabelAndInput label={field.label} name={field.name} type="text" register={register}
                                               required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : ''}/>
                            )
                            //     : field.type === 'dropdown' ? (
                            //     <LabelAndDropdown label={field.label} name={field.name} options={field.options}
                            //                       register={register} required={field.required} defaultValue={isInEdit ? getNestedValue(defValues,field.name) : '' } onChange={()=>{}}/>
                            // )
                                : null}
                        </div>
                    ))}
                </div>

            </SectionWrapper>

            <SectionWrapper label={"Morphology"} bgColor={"bg-gray-200"}>

                <SectionWrapper label={"Part Properties"} bgColor={"bg-blue-200"}>
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

                <SectionWrapper label={"Articles"} bgColor={"bg-blue-200"}>
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

                <SectionWrapper label={"Part Properties"} bgColor={"bg-blue-200"}>
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

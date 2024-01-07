// createSpecies/CreateSpeciesForm.tsx
"use client";

import {useForm, UseFormRegister} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {useState} from "react";
import { Species } from '@/../models/species';
import React from 'react';
import {LabelAndInput} from "@/components/form ui/LableAndInput";
import {LabelAndDropdown} from "@/components/form ui/LabelAndDropdown";
import {PartDetailsProps} from "../../../models/IntefacesAndOptions/interfaces";
import TagInput from "@/components/TagInput";
import { submitSpecies } from './submitSpecies';
import {SectionWrapper} from "@/components/SectionWrapper"; // Import the server-side submit function
// import TabsContainer from "@/components/propnproplist/TabsContainer";
import PartContainer from "@/components/parts/PartContainer";
import PartDetailsForm from "@/components/parts/PartDetailsForm";
import {tag} from "postcss-selector-parser";

interface CreateSpeciesFormProps {
    // isInEdit : boolean;
}

const fieldsBody = [
    { label: 'Title', name: 'body.title', type: 'text', required: true },
    { label: 'Scientific Name', name: 'body.scientificName', type: 'text', required: true },
    { label: 'Local Name', name: 'body.localName', type: 'text', required: true },
    { label: 'Conservation Status', name: 'body.conservationStatus', type: 'dropdown', options: [
            { value: 'endangered', label: 'Endangered' },
            { value: 'threatened', label: 'Threatened' },
            { value: 'not_evaluated', label: 'Not Evaluated' },
        ] },
];

const fieldsTechnical = [
    {label: 'Similar Species',name: 'technicals.speciesClass.similaritiesWith',type: 'TAG',required: false,},
];


const DefaultEmptyValues: PartDetailsProps = {
    typeName: "" , // Name of the part or mark
    isVaries: false , // If the same part or mark varies significantly due to constraints like age, puberty, gender
    variedBy: "" , // Attribute by which it varies (e.g., SexMale)
    imageUrls: [], // Images of the part
    typeDetails: [],
    identifications: {
        visualMarks: "", // Pattern, scales, color
        description: "", // Descriptive text of the pattern
        keywords: ["d"], // Keywords from the description
    },
};

const CreateSpeciesForm: React.FC<CreateSpeciesFormProps> = () => {
    const { register, handleSubmit, reset ,setValue} = useForm<Species>();
    const router = useRouter();
    const [propsList, setPropsList] = useState<string[]>([]);

    const handleTagsChange = (tags: string[] , name : string) => {
        console.log(tags);
        setValue(name, {value:tags});
    };



    const handlePartsChange =(tags: PartDetailsProps[]) => {
        console.log(tags);
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

            <SectionWrapper  label={"Technical Details"} bgColor={"bg-gray-200"}>
                <TagInput onTagsChange={handleTagsChange} name={'technicals.speciesClass.similaritiesWith'} labelName={'Similar Species'} />

                <SectionWrapper label={"Part Properties"} bgColor={"bg-blue-200"}>
                    <PartContainer defValues={DefaultEmptyValues} onListChange={handlePartsChange}></PartContainer>
                </SectionWrapper>

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

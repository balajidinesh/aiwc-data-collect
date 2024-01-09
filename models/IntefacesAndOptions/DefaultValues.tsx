import {PartDetailsProps} from "./interfaces";
import {ArticleDetailsProps} from "./interfaces";


export const fieldsBody = [
    { label: 'Title', name: 'body.title', type: 'text', required: true },
    { label: 'Scientific Name', name: 'body.scientificName', type: 'text', required: true },
    { label: 'Local Name', name: 'body.localName', type: 'text', required: true },
    { label: 'Conservation Status', name: 'body.conservationStatus', type: 'dropdown', options: [
            { value: 'endangered', label: 'Endangered' },
            { value: 'threatened', label: 'Threatened' },
            { value: 'not_evaluated', label: 'Not Evaluated' },
        ] },
];

export const fieldsTechnical = [
    {label: 'Similar Species',name: 'technicals.speciesClass.similaritiesWith',type: 'TAG',required: false,},
];


export const DefaultEmptyPartValues: PartDetailsProps = {
    typeName: "" , // Name of the part or mark
    isVaries: false , // If the same part or mark varies significantly due to constraints like age, puberty, gender
    variedBy: "" , // Attribute by which it varies (e.g., SexMale)
    typeDetails: [],
    identifications: {
        visualMarks: "", // Pattern, scales, color
        description: "", // Descriptive text of the pattern
        keywords: [""], // Keywords from the description
    },
};

export const DefaultEmptyArticleValues: ArticleDetailsProps = {
    articleName: "" , // Name of the part or mark
    isHarvested: false, // Is the animal likely to be killed or farmed
    alternateName: "", // Any known local name
    isVaries: false , // If the same part or mark varies significantly due to constraints like age, puberty, gender
    variedBy: "" , // Attribute by which it varies (e.g., SexMale)
    typeDetails: [],
    identifications: {
        visualMarks: "", // Pattern, scales, color
        describe: "", // Descriptive text of the pattern
        keywords: [], // Keywords from the description
    },
};

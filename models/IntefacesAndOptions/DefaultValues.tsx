import {PartDetailsProps} from "./interfaces";
import {ArticleDetailsProps} from "./interfaces";


export const fieldsBody = [
    { label: 'Title', name: 'body.title', type: 'text', required: true },
    { label: 'Tamil name', name: 'body.tamilName', type: 'text', required: true },
    {
        label: 'Conservation Status',
        name: 'body.conservationStatus',
        type: 'dropdown',
        options: [
            { value: 'EX', label: 'Extinct (EX)' },
            { value: 'EW', label: 'Extinct in the wild (EW)' },
            { value: 'CR', label: 'Critically Endangered (CR)' },
            { value: 'EN', label: 'Endangered (EN)' },
            { value: 'VU', label: 'Vulnerable (VU)' },
            { value: 'NT', label: 'Near Threatened (NT)' },
            { value: 'CD', label: 'Conservation Dependent (CD)' },
            { value: 'LC', label: 'Least concern (LC)' },
            { value: 'DD', label: 'Data deficient (DD)' },
            { value: 'NE', label: 'Not evaluated (NE)' },
        ],
    },



];

export const fieldsScientific = [
    { label: 'Schedule', name: 'body.Schedule', type: 'dropdown',
        options: [
            { value: 'Schedule 1', label: 'Schedule Ⅰ' },
            { value: 'Schedule 2', label: 'Schedule Ⅱ' },
        ],
    },
];

export const optionsScientificParts = [
    { label: 'Schedule Part', name: 'body.SchedulePart', type: 'dropdown',
        options:[ [
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
        { value: 'E', label: 'E' },
        { value: 'F', label: 'F' },
        { value: 'G', label: 'G' },
        { value: 'H', label: 'H' },
        { value: 'I', label: 'I' },
        { value: 'J', label: 'J' },
        { value: 'K', label: 'K' },
    ],
        [
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
            { value: 'C', label: 'C' },
            { value: 'D', label: 'D' },
            { value: 'E', label: 'E' },
            { value: 'F', label: 'F' },
            { value: 'G', label: 'G' },
            { value: 'H', label: 'H' },
            { value: 'I', label: 'I' },
        ]
    ],
    },
]

export const fieldsScientificName = [
    { label: 'Domain', name: 'body.domain', type: 'text', required: true },
    { label: 'Kingdom', name: 'body.kingdom', type: 'text', required: true },
    { label: 'Phylum', name: 'body.phylum', type: 'text', required: true },
    { label: 'Class', name: 'body.class', type: 'text', required: true },
    { label: 'Order', name: 'body.order', type: 'text', required: true },
    { label: 'Family', name: 'body.family', type: 'text', required: true },
    { label: 'Subfamily', name: 'body.subfamily', type: 'text', required: true },
    { label: 'Genus', name: 'body.genus', type: 'text', required: true },
    { label: 'Species', name: 'body.species', type: 'text', required: true },
    { label: 'Scientific Name', name: 'body.scientificName', type: 'text', required: true },
]

export const fieldsTechnical = [
    {label: 'Similar Species',name: 'technicals.similaritiesWith',type: 'TAG',required: false,},
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

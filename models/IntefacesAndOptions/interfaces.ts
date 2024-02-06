

export interface TypeDetailsProps {
    characterName: string;
    scale: string;
    value: string;
}


export interface TaxonomyProps {
    domain: string;
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    subfamily: string;
    genus: string;
    species: string;
    scientificName: string;
}

export interface PartDetailsProps{
    typeName: string , // Name of the part or mark
    isVaries: boolean , // If the same part or mark varies significantly due to constraints like age, puberty, gender
    variedBy: string , // Attribute by which it varies (e.g., SexMale)
    imageUrls: string,
    typeDetails: TypeDetailsProps[],
    identifications: {
        visualMarks: string, // Pattern, scales, color
        description: string, // Descriptive text of the pattern
        keywords: string[], // Keywords from the description
    },
}


export interface ArticleDetailsProps {
    articleName: string, // Article name
    isHarvested: boolean, // Is the animal likely to be killed or farmed
    alternateName: string, // Any known local name
    isVaries: boolean, // If the same article varies significantly due to constraints like age, puberty, gender
    variedBy: string, // Attribute by which it varies (e.g., SexMale)
    imageUrls: string,
    typeDetails: TypeDetailsProps[],
    identifications: {
        visualMarks: string, // Pattern, scales, color
        describe: string, // Descriptive text of the pattern
        keywords: string[], // Keywords from the description
    },
}



export interface geoInformation{
        places: string[], // List of places where the species is found
        habitats: string[],
}
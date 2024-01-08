

import React, { useState, useEffect } from 'react';
import exp from "node:constants";
export interface TypeDetailsProps {
    characterName: string;
    scale: string;
    value: string;
}


export interface PartDetailsProps{
    typeName: string , // Name of the part or mark
    isVaries: boolean , // If the same part or mark varies significantly due to constraints like age, puberty, gender
    variedBy: string , // Attribute by which it varies (e.g., SexMale)
    imageUrls: string[], // Images of the part
    typeDetails: TypeDetailsProps[],
    identifications: {
        visualMarks: string, // Pattern, scales, color
        description: string, // Descriptive text of the pattern
        keywords: string[], // Keywords from the description
    },
}


export interface ArticleDetailsProps {
    articleName: string, // Article name
    imageUrls: string[], // Article images
    isHarvested: boolean, // Is the animal likely to be killed or farmed
    alternateName: string, // Any known local name
    isVaries: boolean, // If the same article varies significantly due to constraints like age, puberty, gender
    variedBy: string, // Attribute by which it varies (e.g., SexMale)
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
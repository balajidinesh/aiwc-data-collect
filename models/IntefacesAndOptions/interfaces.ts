

import React, { useState, useEffect } from 'react';
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
// createSpecies/submitSpecies.ts""
"use server";

import mongoose from "mongoose";
import { connectClient } from '@/../lib/mongodb';
import { useRouter } from 'next/navigation';
import SpeciesModel, { Species } from '@/../models/species';
import jsonData from '@/app/constants/speciesExample.json'


export async function submitSpecies(formData: Species) {
    try {
        await connectClient(); // Connect to MongoDB server


        const newSpecies = await mongoose.models.Species.create(formData);

        // console.log('New Species created:', newSpecies);
        return "parsing done";
    } catch (error) {
        console.error('Error creating species:', error);
        throw new Error('Error creating species');
    }
}


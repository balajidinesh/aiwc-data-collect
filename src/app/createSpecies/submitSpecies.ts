// createSpecies/submitSpecies.ts""
"use server";

import mongoose from "mongoose";
import { connectClient } from '@/../lib/mongodb';
import { useRouter } from 'next/navigation';
import SpeciesModel, { Species } from '@/../models/species';
import jsonData from '@/app/constants/speciesExample.json'


export async function submitSpecies(formData: any) {
    try {
        await connectClient(); // Connect to MongoDB server
        let dummy = jsonData as Species ;

        dummy.body.title = formData.body.title;

        console.log(formData.body.title)
        const newSpecies = await mongoose.models.Species.create(dummy);

        // console.log('New Species created:', newSpecies);
        return "parsing done";
    } catch (error) {
        console.error('Error creating species:', error);
        throw new Error('Error creating species');
    }
}


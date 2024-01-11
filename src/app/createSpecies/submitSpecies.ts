// createSpecies/submitSpecies.ts""
"use server";

import mongoose from "mongoose";
import { connectClient } from '@/../lib/mongodb';
export async function submitSpecies(formData: mongoose.UpdateQuery<any> | undefined, id : string = '') {
    try {
        await connectClient(); // Connect to MongoDB server

        if (id) {
            // If id is provided, update the existing species
            const updatedSpecies = await mongoose.models.Species.findByIdAndUpdate(
                id,
                formData,
                { new: true } // Return the updated document
            );

            if (!updatedSpecies) {
                return ('Species not found for the given id') ;
            }

            console.log('Species updated:', updatedSpecies);
            return 'Species updated';
        } else {
            // If id is not provided, create a new species
            const newSpecies = await mongoose.models.Species.create(formData);
            console.log('Species updated:',newSpecies)
            // console.log('New Species created:', newSpecies);
            return 'New species created';
        }
    } catch (error) {
        console.error('Error submitting species:', error);
        throw new Error('Error submitting species');
    }
}


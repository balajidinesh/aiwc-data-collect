// server.js
import {connectClient} from "../../lib/mongodb";
import {SpeciesModel,Species} from "../../models/species";
import {paraSpecies} from "@/app/page";


export async function getServerSide(){
    try {
        const speciesData = await fetchDataFromMongoDB();
        // console.log(speciesData)
        return { speciesData : speciesData as paraSpecies[]} ;
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return { speciesData : [] as paraSpecies[]} ;
    }
}


async function fetchDataFromMongoDB() {
    await connectClient(); // Connect to MongoDB
    // const SpeciesModel = require('@/../models/species').default;
    return await SpeciesModel.find({})
        .select('body _id updatedAt')
        .sort({ updatedAt: -1 })
        .exec();
}

export async function getSpeciesDataById(id: string) {
    try {
        const speciesData = await fetchSpeciesDataFromMongoDB(id);
        return { speciesData };
    } catch (error) {
        console.error("Error fetching data from MongoDB:", error);
        return { speciesData: null };
    }
}

async function fetchSpeciesDataFromMongoDB(id: string) {
    await connectClient(); // Connect to MongoDB
    return await SpeciesModel.findById(id).exec();
}
export async function fetchSpeciesById(speciesId: string): Promise<Species | null> {
    try {
        await connectClient(); // Connect to MongoDB
        const species = await SpeciesModel.findById(speciesId).exec();
        return species ? JSON.parse(JSON.stringify(species)) : null;
    } catch (error) {
        console.error('Error fetching species data by ID:', error);
        return null;
    }
}





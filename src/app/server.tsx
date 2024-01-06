// server.js
import {connectClient} from "../../lib/mongodb";
import SpeciesModel from "../../models/species";
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

// pages/api/species/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import {connectClient} from "../../../lib/mongodb";
import SpeciesModel from "../../../models/species";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    try {
        await connectClient(); // Connect to MongoDB
        const speciesData = await SpeciesModel.findById(id as string).exec();


        if (speciesData) {
            res.status(200).json({ speciesData });
        } else {
            res.status(404).json({ error: 'Species not found' });
        }
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

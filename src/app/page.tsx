// page.tsx

import { connectClient } from "@/../lib/mongodb";
import SpeciesModel, { Species } from '@/../models/species';
import {getServerSide} from "@/app/server";
import Dashboard from "@/app/dashboard";

export type paraSpecies = {
    _id: string;
    body: {
        title: string;
        mainImageUrls: string[];
        scientificName: string;
        localName: string;
        conservationStatus: string;
        tags: string[];
    };
    updatedAt: Date;
};

export default async function Home() {
    const {speciesData} = await getServerSide() ;
    console.log(speciesData.length)
    return (
        <Dashboard speciesData={speciesData}/>
    );
}

// page.tsx

import {getServerSide} from "@/app/server";
import Dashboard from "@/app/dashboard";
export const revalidate = 0;

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

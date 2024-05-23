// page.tsx

import {getServerSide} from "@/app/server";
import Dashboard from "@/app/dashboard";
import {TaxonomyProps} from "../../models/IntefacesAndOptions/interfaces";
import {Suspense} from "react";
// export const revalidate = 0;

export type paraSpecies = {
    _id: string;
    body: {
        title: string;
        mainImageUrls: string[];
        scientificName: string;
        tamilName: string;
        taxonomy:TaxonomyProps;
        conservationStatus: string;
        tags: string[];
    };
    updatedAt: Date;
};

export default async function Home() {
    const {speciesData} = await getServerSide() ;
    console.log(speciesData.length)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Dashboard speciesData={speciesData}/>
        </Suspense>
    );
}

// edit/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import CreateSpeciesForm from "@/app/createSpecies/CreateSpeciesForm";

const EditSpecies: React.FC = () => {
    const [species, setSpecies] = useState<any | null>(null);
    const searchParams = useSearchParams();
    const id = searchParams?.get('id') ?? '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/species/${id}`);
                const data = await response.json();
                if (response.status === 200) {
                    setSpecies(data.speciesData);
                } else {
                    console.error('Error fetching species data:', data.error);
                }
            } catch (error) {
                console.error('Error fetching species data:', error);
            }
        };

        fetchData().then(() => console.log("species being edited"));
    }, [id]);

    if (!species) {
        return <div>Loading...</div>;
    }

    return (
        <CreateSpeciesForm isInEdit={true} defValues={species} idofEdit={id}></CreateSpeciesForm>
    );
};

const EditSpeciesWithSuspense: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <EditSpecies />
    </Suspense>
);

export default EditSpeciesWithSuspense;

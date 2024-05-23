// view/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';

const ViewSpecies: React.FC = () => {
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

        fetchData().then(() => console.log("called new species"));
    }, [id]);

    if (!species) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pt-10 px-5">
            <h1 className="text-4xl font-semibold mb-7">View Species</h1>
            <pre>{JSON.stringify(species, null, 4)}</pre>
        </div>
    );
};

const ViewSpeciesWithSuspense: React.FC = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <ViewSpecies />
    </Suspense>
);

export default ViewSpeciesWithSuspense;

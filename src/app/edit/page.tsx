// pages/edit/[id].tsx
"use client";

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Assuming you are using react-router-dom for navigation
import React, { useEffect, useState } from 'react';
import CreateSpeciesForm from "@/app/createSpecies/CreateSpeciesForm";




const EditSpecies: React.FC = () => {
    const [species, setSpecies] = useState< any | null>(null);
    const router = useRouter();

    const searchParams = useSearchParams()
    const id  = searchParams?.get('id') ?? ''



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/species/${id}`);
                console.log(response)
                const data = await response.json();
                if (response.status === 200) {
                    setSpecies(data.speciesData);
                } else {
                    console.error('Error fetching species data:', data.error);
                    // Redirect to an error page or handle as needed
                    // router.push('/error');
                }
            } catch (error) {
                console.error('Error fetching species data:', error);
                // Redirect to an error page or handle as needed
                // router.push('/error');
            }
        };

        fetchData().then();
    }, [id, router]);

    if (!species) {
        return <div>Loading...</div>; // You might want to show a loading state
    }

    return (
        <CreateSpeciesForm isInEdit={true} defValues={species}></CreateSpeciesForm>
    );
};

export default EditSpecies;

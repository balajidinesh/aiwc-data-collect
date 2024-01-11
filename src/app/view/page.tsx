// pages/edit/[id].tsx
"use client";

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactJson from 'react-json-view'; // Import react-json-view

export const revalidate = 0;
const ViewSpecies: React.FC = ({ }) => {
    const [species, setSpecies] = useState<any | null>(null);
    const router = useRouter();

    const searchParams = useSearchParams()
    const id = searchParams?.get('id') ?? ''

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/species/${id}`, {
                    next: { revalidate: 0 },
                });
                console.log(response)
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

        fetchData().then();
    }, [id, router]);

    if (!species) {
        return <div>Loading...</div>;
    }

    return (
        <div className=" pt-10 px-5">
            <h1 className="text-4xl font-semibold mb-7">Details of  {species.body.title}</h1>
            {/* Use ReactJson to display JSON data */}
            <ReactJson
                src={species}
                name={false} // Hide the "root" name
                displayDataTypes={false} // Hide the data types at the end of the keys
                theme="monokai" // You can choose a different theme if you prefer
                indentWidth={4} // Number of spaces to use for indentation
                enableClipboard={false} // Disable clipboard copy
            />
        </div>
    );
};

export default ViewSpecies;

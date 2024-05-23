// dashboard.tsx
"use client"

import { NextPage } from "next";
import {paraSpecies} from "@/app/page";
import { Suspense } from "react";
import {useRouter} from "next/navigation";
// dashboard.tsx

interface DashboardProps {
    speciesData: paraSpecies[]; // Update type to allow for undefined
}

const Dashboard: NextPage<DashboardProps> = ({ speciesData }) => {
    const router = useRouter();

    const handleView = (id: string) => {
        router.push(`/view?id=${id}`);
    };

    const handleEdit = (id: string) => {
        router.push(`/edit?id=${id}`);
    };

    return (
        <main className="text-center pt-10 px-5">
            <h1 className="text-4xl font-semibold mb-7">Species Table</h1>

            {speciesData.length === 0 ? (
                <p>No species data available. Create new species to view the table.</p>
            ) : (
                <table className="table-auto w-full">
                    <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Tamil Name</th>
                        <th className="border px-4 py-2">Scientific Name</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {speciesData.map((species) => (
                        <tr key={species._id}>
                            <td className="border px-4 py-2">{species.body.title}</td>
                            <td className="border px-4 py-2">{species.body.tamilName}</td>
                            <td className="border px-4 py-2">
                                {species.body.taxonomy.scientificName}
                            </td>
                            <td className="border px-4 py-2">
                                <Suspense fallback={<div>Loading...</div>}>
                                        <span
                                            className="text-blue-500 cursor-pointer mr-2"
                                            onClick={() => handleView(species._id)}
                                        >
                                            View
                                        </span>
                                    <span
                                        className="text-blue-500 cursor-pointer"
                                        onClick={() => handleEdit(species._id)}
                                    >
                                            Edit
                                        </span>
                                </Suspense>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </main>
    );
};

export default Dashboard;

// dashboard.tsx
import { NextPage } from "next";
import { Species } from "../../models/species";
import Link from "next/link";
import {paraSpecies} from "@/app/page";

interface DashboardProps {
    speciesData: paraSpecies[] ; // Update type to allow for undefined
}

const Dashboard: NextPage<DashboardProps> = ({ speciesData }) => {
    console.log(speciesData)

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
                        <th className="border px-4 py-2">Local Name</th>
                        <th className="border px-4 py-2">Scientific Name</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {speciesData.map((species) => (
                        <tr key={species._id}>
                            <td className="border px-4 py-2">{species.body.title}</td>
                            <td className="border px-4 py-2">{species.body.localName}</td>
                            <td className="border px-4 py-2">
                                {species.body.scientificName}
                            </td>
                            <td className="border px-4 py-2">
                                <Link href={`/edit/${species._id}`} passHref>
                                    <span className="text-blue-500 cursor-pointer">Edit</span>
                                </Link>
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

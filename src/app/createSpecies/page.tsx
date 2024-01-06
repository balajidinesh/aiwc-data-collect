// createSpecies/page.tsx
import CreateSpeciesForm from "@/app/createSpecies/CreateSpeciesForm";
// import React from "react"; // Import the CreateSpeciesForm component

const CreateSpeciesPage: React.FC = () => {
    return (
        <main className="pt-16 px-5">
            <h1 className="text-left text-2xl font-semibold mb-5">Create New Species</h1>

            <CreateSpeciesForm />
        </main>
    );
};

export default CreateSpeciesPage;

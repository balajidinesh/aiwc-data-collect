// createSpecies/page.tsx
import CreateSpeciesForm from "@/app/createSpecies/CreateSpeciesForm";

// import React from "react"; // Import the CreateSpeciesForm component
const defaultValues = {
    "body": {
        "title": "BlackBuck",
        "scientificName": "Antilope cervicapra",
        "localName": "வெளிமான்",
        "conservationStatus": "not_evaluated",
        "tags": [
            "Traded",
            "Endangered"
        ]
    },
    "technicals": {
        "parts": [
            {
                "typeName": "Horn",
                "isVaries": true,
                "variedBy": "Male",
                "typeDetails": [
                    {
                        "characterName": "height",
                        "scale": "Length",
                        "value": "35-75",
                        "_id": {
                            "$oid": "659db4ded7df79dd034393d6"
                        }
                    }
                ],
                "identifications": {
                    "visualMarks": "HornShape",
                    "description": "The long, ringed horns, that resemble corkscrews, are generally present only on males.",
                    "keywords": [
                        "long",
                        "ringed horns"
                    ]
                },
                "_id": {
                    "$oid": "659db4ded7df79dd034393d5"
                }
            }
        ],
        "harvestedArticles": [
            {
                "articleName": "skin",
                "isHarvested": true,
                "alternateName": "skin",
                "isVaries": true,
                "variedBy": "SexMale",
                "identifications": {
                    "visualMarks": "marks",
                    "describe": "dark brown to black on the dorsal surface and the underside is white",
                    "keywords": [
                        "dark brown",
                        "dorsal surface"
                    ]
                },
                "_id": {
                    "$oid": "659db4ded7df79dd034393d7"
                }
            }
        ],
        "speciesClass": {
            "similaritiesWith": []
        }
    },
    "geoInformation": {
        "foundAt": {
            "places": [
                "Tamil Nadu",
                "Eastern Cost Andhra"
            ]
        },
        "habitats": [
            "tropical",
            "tropicalGrasslands"
        ]
    },
    "descriptionOrExplanation": "Adult males are dark brown to black on the dorsal surface and the underside is white, female, sub-adults and fawn are reddish yellow on the dorsal side, white on the ventral side. adult males have long and spiraled horns. females are hornless; eyes, nose are surrounded by white rings. buttocks and legs are covered with white color.",
    // "createdAt": new Date("2024-01-09T21:04:30.076Z"),
    // "updatedAt": new Date("2024-01-09T21:04:30.076Z"),
};


const CreateSpeciesPage: React.FC = () => {
    // @ts-ignore
    return (
        <main className="pt-16 px-5">
            <h1 className="text-left text-2xl font-semibold mb-5">Create New Species</h1>

            <CreateSpeciesForm isInEdit={false} defValues={defaultValues}></CreateSpeciesForm>
        </main>
    );
};

export default CreateSpeciesPage;

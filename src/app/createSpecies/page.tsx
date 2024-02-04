// createSpecies/page.tsx
import CreateSpeciesForm from "@/app/createSpecies/CreateSpeciesForm";
import React from "react";

// import React from "react"; // Import the CreateSpeciesForm component
const defaultValues = {
        "body": {
            "title": "BlackBuck",
            "mainImageUrls": [],
            "tamilName": "வெளிமான்",
            "conservationStatus": "not_evaluated",
            "domain": "",
            "kingdom": "",
            "phylum": "",
            "class": "",
            "order": "",
            "family": "",
            "subfamily": "",
            "genus": "",
            "species": "",
            "scientificName": "Antilope cervicapra",
            "Schedule": "",
            "SchedulePart": "",
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
                    "imageUrls": "",
                    "typeDetails": [
                        {
                            "characterName": "height",
                            "scale": "Length_cm",
                            "value": "35-75"
                        }
                    ],
                    "identifications": {
                        "visualMarks": "HornShape",
                        "description": "The long, ringed horns, that resemble corkscrews, are generally present only on males.",
                        "keywords": [
                            "long",
                            "ringed horns"
                        ]
                    }
                }
            ],
            "harvestedArticles": [
                {
                    "articleName": "skin",
                    "imageUrls": "",
                    "isHarvested": true,
                    "alternateName": "skin",
                    "isVaries": true,
                    "variedBy": "SexMale",
                    "typeDetails": [
                        {
                            "characterName": "description",
                            "scale": "Length_cm",
                            "value": "dark brown to black on the dorsal surface and the underside is white"
                        }
                    ],
                    "identifications": {
                        "visualMarks": "marks",
                        "describe": "dark brown to black on the dorsal surface and the underside is white",
                        "keywords": [
                            "dark brown",
                            "dorsal surface"
                        ]
                    }
                }
            ],
            "similaritiesWith": []
        },
        "geoInformation": {
            "places": [
                "Tamil Nadu",
                "Eastern Cost Andhra"
            ],
            "habitats": [
                "tropical",
                "tropicalGrasslands"
            ]
        },
        "descriptionOrExplanation": "Adult males are dark brown to black on the dorsal surface and the underside is white, " +
            "female, sub-adults and fawn are reddish yellow on the dorsal side, white on the ventral side. adult males have long and spiraled horns. " +
            "females are hornless; eyes, nose are surrounded by white rings. buttocks and legs are covered with white color."
    };


const CreateSpeciesPage: React.FC = () => {
    // @ts-ignore
    return (
        <main className="pt-16 px-5">
            <h1 className="text-left text-2xl font-semibold mb-5">Create New Species</h1>

            <CreateSpeciesForm isInEdit={false} defValues={defaultValues} idofEdit={''} ></CreateSpeciesForm>
        </main>
    );
};

export default CreateSpeciesPage;

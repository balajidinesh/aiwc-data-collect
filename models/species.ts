import mongoose, {InferSchemaType, models} from 'mongoose';
import {connectClient} from "../lib/mongodb";


const speciesSchema
    = new mongoose.Schema({
    // General Information
    body: {
        title: { type: String, required: true }, // Title of the species
        // mainImageUrls: [{ type: String }], // URLs for main images
        tamilName: { type: String, required: true }, // tamil name
        conservationStatus: { type: String }, // Conservation status
        domain: { type: String, required: true }, // Domain
        kingdom: { type: String, required: true }, // Kingdom
        phylum: { type: String, required: true }, // Phylum
        class: { type: String, required: true }, // Class
        order: { type: String, required: true }, // Order
        family: { type: String, required: true }, // Family
        subfamily: { type: String, required: true }, // Subfamily
        tribe: { type: String, required: true }, // Tribe
        genus: { type: String, required: true }, // Genus
        scientificName: { type: String, required: true }, // Scientific name
        categories: { type: String, required: true }, // category
        subCategories: { type: String, required: true },
        tags: [{ type: String }], // Tags like Traded, Endangered
    },

    // Technical Details
    technicals: {
        parts: [{
            typeName: { type: String }, // Name of the part or mark
            isVaries: { type: Boolean }, // If the same part or mark varies significantly due to constraints like age, puberty, gender
            variedBy: { type: String }, // Attribute by which it varies (e.g., SexMale)
            // imageUrls: [{ type: String }], // Images of the part
            typeDetails: [{
                characterName: { type: String }, // Name of characteristic (e.g., color, height, width, depth)
                scale: { type: String }, // Type of unit for the characteristic
                value: { type: String }, // Value of the characteristic
            }],
            identifications: {
                visualMarks: { type: String }, // Pattern, scales, color
                description: { type: String }, // Descriptive text of the pattern
                keywords: [{ type: String }], // Keywords from the description
            },
        }],

        harvestedArticles: [{
            articleName: { type: String }, // Article name
            // imageUrls: [{ type: String }], // Article images
            isHarvested: { type: Boolean }, // Is the animal likely to be killed or farmed
            alternateName: { type: String }, // Any known local name
            isVaries: { type: Boolean }, // If the same article varies significantly due to constraints like age, puberty, gender
            variedBy: { type: String }, // Attribute by which it varies (e.g., SexMale)
            typeDetails: [{
                characterName: { type: String }, // Description of the characteristic
                scale: { type: String }, // Type of units
                value: { type: String }, // Value of the characteristic
            }],
            identifications: {
                visualMarks: { type: String }, // Pattern, scales, color
                describe: { type: String }, // Descriptive text of the pattern
                keywords: [{ type: String }], // Keywords from the description
            },
        }],


        similaritiesWith: [{ type: String }], // Known the closest family of species

    },



    // Geographic Information
    geoInformation: {
        places: [{ type: String }], // List of places where the species is found
        habitats: [{ type : String}],
    },

    // Description or Explanation // Miscellaneous Information
    descriptionOrExplanation: { type: String }, // Describe the animal, summarize, any details that need external description


}, {timestamps : true});

await connectClient();
const SpeciesModel = models.Species ?? mongoose.model('Species', speciesSchema);
console.log('SpeciesModel:', SpeciesModel);

export default SpeciesModel;

export type Species = InferSchemaType<typeof speciesSchema>;

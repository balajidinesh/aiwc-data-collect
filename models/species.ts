import mongoose, {InferSchemaType, models} from 'mongoose';


const speciesSchema
    = new mongoose.Schema({
    // General Information
    body: {
        title: { type: String, required: true }, // Title of the species
        mainImageUrls: [{ type: String }], // URLs for main images
        scientificName: { type: String, required: true }, // Scientific name
        localName: { type: String, required: true }, // Local name
        conservationStatus: { type: String }, // Conservation status
        tags: [{ type: String }], // Tags like Traded, Endangered
    },

    // Technical Details
    technicals: {
        speciesClass: {
            similaritiesWith: [{ type: String }], // Known the closest family of species
        },
        parts: [{
            typeName: { type: String }, // Name of the part or mark
            isVaries: { type: Boolean }, // If the same part or mark varies significantly due to constraints like age, puberty, gender
            variedBy: { type: String }, // Attribute by which it varies (e.g., SexMale)
            imageUrls: [{ type: String }], // Images of the part
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
            imageUrls: [{ type: String }], // Article images
            isHarvested: { type: Boolean }, // Is the animal likely to be killed or farmed
            alternateName: { type: String }, // Any known local name
            isVaries: { type: Boolean }, // If the same article varies significantly due to constraints like age, puberty, gender
            variedBy: { type: String }, // Attribute by which it varies (e.g., SexMale)
            typeDetails: {
                characterName: { type: String }, // Description of the characteristic
                scale: { type: String }, // Type of units
                value: { type: String }, // Value of the characteristic
            },
            identifications: {
                visualMarks: { type: String }, // Pattern, scales, color
                describe: { type: String }, // Descriptive text of the pattern
                keywords: [{ type: String }], // Keywords from the description
            },
        }],
    },

    // Geographic Information
    geoInformation: {
        foundAt: {
            places: [{ type: String }], // List of places where the species is found
        },
        habitats: [{
            name: { type: String }, // Name of the habitat
            class: [{ type: String }], // Terrestrial or aquatic
            typesList: [{
                type: { type: String }, // Type of habitat (Forests, Grasslands, Deserts)
                subtypes: [{ type: String }], // Subtypes (Temperate, Tropical)
            }],
        }],
    },

    // Description or Explanation
    descriptionOrExplanation: { type: String }, // Describe the animal, summarize, any details that need external description

    // Miscellaneous Information
    miscellaneous: {
        isPoisonous: { type: Boolean }, // If the species is poisonous
        isVenomous: { type: Boolean }, // If the species is venomous
        isTradedAlive: { type: Boolean }, // If the species is traded alive
        population: { type: Number }, // Population count if available
    },
}, {timestamps : true});

const SpeciesModel = models.Species ?? mongoose.model('Species', speciesSchema);
console.log('SpeciesModel:', SpeciesModel);

export type Species = InferSchemaType<typeof speciesSchema>;
export default SpeciesModel;
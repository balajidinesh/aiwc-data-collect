import mongoose from "mongoose";

export async function connectClient() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
        }
        const uri = process.env.MONGODB_URI;
        const options = {};
        return await mongoose.connect(uri, options);
    } catch (error) {
        console.error("There was an error connection to the DB", error);
    }
}
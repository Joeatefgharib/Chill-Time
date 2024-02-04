import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    image: { type: String, required: true },
    description: { type: String, required: true },
    relatedMovies: [{ type: String, required: false }], // Array of movie IDs
    relatedSeries: [{ type: String, required: false }] // Array of movie IDs
});

const Actor = mongoose.model('Actor', actorSchema);

export default Actor
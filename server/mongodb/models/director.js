import mongoose from "mongoose";

const directorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true },
    description: { type: String, required: true },
    relatedMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'movies' }],
    relatedSeries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'series' }],
});

const Director = mongoose.model('directors', directorSchema);

export default Director;

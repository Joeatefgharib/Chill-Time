import mongoose from "mongoose";

const genreSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    genre: { type: String, required: true },
    movies: [{type: String, required: false}],
    series: [{type: String, required: false}]
});

const Genre = mongoose.model('Genre', genreSchema);

export default Genre ;

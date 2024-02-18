import mongoose from "mongoose";

const yearSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    year: { type: String, required: true },
    movies: [{type: String, required: false}],
    series: [{type: String, required: false}]
});

const Year = mongoose.model('Year', yearSchema);

export default Year ;

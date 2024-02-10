import mongoose from "mongoose";

const langSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    lang: { type: String, required: true },
    movies: [{type: String, required: false}],
    series: [{type: String, required: false}]
});

const Lang = mongoose.model('Lang', langSchema);

export default Lang ;

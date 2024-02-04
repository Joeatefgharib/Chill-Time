import mongoose from "mongoose";

const trendmoviesSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  movies: [{ type: String, required: false }],
});

const Trendmovies = mongoose.model("trendmovie", trendmoviesSchema);

export default Trendmovies;

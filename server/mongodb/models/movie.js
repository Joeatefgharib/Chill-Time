import mongoose from "mongoose";
import Actor from "./actor.js";
import Genre from "./genre.js";

const movieSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  genre: [{ type: String, ref: "Genre" }],
  year: { type: String, required: true },
  description: { type: String, required: true },
  poster: { type: String, required: true },
  movieLink: { type: String, required: true },
  actors: [{ type: String, ref: "Actor" }], // Reference to actors
  trending: { type: Boolean, default: false },
  trendpic: {type: String, required:false}
});

movieSchema.post("findOneAndUpdate", async function (doc) {
  const actors = doc.actors;
  for (const actorData of actors) {
    await Actor.findByIdAndUpdate(actorData.actorId, {
      $addToSet: {
        relatedMovies: {
          _id: doc._id,
          title: doc.title,
          poster: doc.poster,
        },
      },
    });
  }
  const genre = doc.genre;
  for (const genreData of genre) {
    await Genre.findByIdAndUpdate(genreData.genreId, {
      $addToSet: {
        movies: {
          _id: doc._id,
          title: doc.title,
          poster: doc.poster,
        },
      },
    });
  }
  const trending = doc.trending;

});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;

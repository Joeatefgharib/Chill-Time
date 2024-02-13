import mongoose from "mongoose";
import Actor from "./actor.js";
import Genre from "./genre.js";

const seriesSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: String,
      ref: "Genre",
    },
  ],
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  seasons: [
    {
      seasonNumber: { type: String, required: true },
      episodes: [
        {
          episodeNumber: { type: String, required: true },
          title: { type: String, required: true },
          img: { type: String, required: true },
          qualities: [
            {
              type: { type: String, required: true }, // Quality type (e.g., HD, SD, 4K)
              link: { type: String, required: true }, // Link to the movie for this quality
            },
          ],
        },
      ],
      seasonPoster: {
        type: String,
        required: true,
      },
    },
  ],
  poster: { type: String, required: true },
  actors: [{ type: String, ref: "Actor" }], // Reference to actors
});

seriesSchema.post("findOneAndUpdate", async function (doc) {
  const actors = doc.actors;
  for (const actorData of actors) {
    await Actor.findByIdAndUpdate(actorData.actorId, {
      $addToSet: {
        relatedSeries: {
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
        series: {
          _id: doc._id,
          title: doc.title,
          poster: doc.poster,
        },
      },
    });
  }

  const lang = doc.lang;
  for (const langData of lang) {
    await Lang.findByIdAndUpdate(langData.langId, {
      $addToSet: {
        movies: {
          _id: doc._id,
          title: doc.title,
          poster: doc.poster,
        },
      },
    });
  }
});

const Series = mongoose.model("Series", seriesSchema);

export default Series;

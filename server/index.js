import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import connectDB from "./mongodb/connect.js";
import Login from "./mongodb/models/login.js";
import Director from "./mongodb/models/director.js";
import Series from "./mongodb/models/series.js";
import Movie from "./mongodb/models/movie.js";
import Actor from "./mongodb/models/actor.js";
import Genre from "./mongodb/models/genre.js";
import Lang from "./mongodb/models/lang.js"
import Year from "./mongodb/models/year.js"
import Trendmovies from "./mongodb/models/trendmovies.js";
import Trendseries from "./mongodb/models/trendseries.js";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// use ejs as the view engine
app.set("view engine", "ejs");
// static file
app.use(express.static("public"));
// Middleware to parse incoming request data
app.use(express.urlencoded({ extended: true }));


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Define routes
app.get("/addmovie", (req, res) => {
  res.render("addMovie"); // Render your moviesdashboard template or send some response
});

app.get("/addseries", (req, res) => {
  res.render("addSeries"); // Render your seriesdashboard template or send some response
});

app.get("/addactor", (req, res) => {
  res.render("addActor"); // Render your actorsdashboard template or send some response
});

app.get("/adddirector", (req, res) => {
  res.render("addDirector"); // Render your directorsdashboard template or send some response
});

app.get("/api/movies", async function (req, res) {
  try {
    const result = await Movie.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/series", async function (req, res) {
  try {
    const result = await Series.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/movies/:id", async function (req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving movie data");
  }
});

app.get("/api/movies/:id/actors", async function (req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie.actors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving movie actors data");
  }
});

app.get("/api/movies/:id/qualities", async function (req, res) {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie.qualities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving movie actors data");
  }
});

app.get("/api/movies/:id/qualities/:type", async function (req, res) {
  try {
    // Find the movie by ID
    const movie = await Movie.findById(req.params.id);

    // If movie is not found, return 404 Not Found status
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    // Get the quality type from the request parameters
    const qualityType = req.params.type;

    // Find the quality object based on the type
    const quality = movie.qualities.find(q => q.type === qualityType);

    // If quality is not found, return 404 Not Found status
    if (!quality) {
      return res.status(404).send("Quality not found for this movie");
    }

    // Send the quality object
    res.send(quality);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving movie quality data");
  }
});

app.get("/api/series/:id/qualities", async function (req, res) {
  try {
    const series = await Series.findById(req.params.id);
    res.send(series.qualities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving series  data");
  }
});

app.get("/api/movies/:id/qualities/:type", async function (req, res) {
  try {
    // Find the movie by ID
    const movie = await Movie.findById(req.params.id);

    // If movie is not found, return 404 Not Found status
    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    // Get the quality type from the request parameters
    const qualityType = req.params.type;

    // Find the quality object based on the type
    const quality = movie.qualities.find(q => q.type === qualityType);

    // If quality is not found, return 404 Not Found status
    if (!quality) {
      return res.status(404).send("Quality not found for this movie");
    }

    // Send the quality object
    res.send(quality);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving movie quality data");
  }
});

app.get("/api/series/:id", async function (req, res) {
  try {
    const series = await Series.findById(req.params.id);
    res.send(series);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving series data");
  }
});

app.get("/api/series/:id/actors", async function (req, res) {
  try {
    const series = await Series.findById(req.params.id);
    res.send(series.actors);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving series actors data");
  }
});

app.get("/api/series/:id/seasons", async function (req, res) {
  try {
    const series = await Series.findById(req.params.id);
    if (!series) {
      res.status(404).send("Series not found");
      return;
    }

    if (series) {
      res.send(series.seasons);
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving episode links");
  }
});

app.get("/api/series/:id/:seasonNumber/episodes", async function (req, res) {
  try {
    const series = await Series.findById(req.params.id);

    if (!series) {
      return res.status(404).send("Series not found");
    }

    const targetSeason = series.seasons.find(
      (season) => season.seasonNumber === req.params.seasonNumber
    );

    if (!targetSeason) {
      return res.status(404).send("Season not found");
    }

    const episodes = targetSeason.episodes;

    if (episodes && episodes.length > 0) {
      res.send(episodes); // Send the entire array of episodes
    } else {
      res.status(404).send("No episodes found in this season");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving episode links");
  }
});


app.get("/api/series/:id/:seasonNumber/:ep", async function (req, res) {
  try {
    const series = await Series.findById(req.params.id);

    const targetSeason = series.seasons.find(
      (season) => season.seasonNumber === req.params.seasonNumber
    );

    if (!targetSeason) {
      return res.status(404).send("Season not found");
    }

    const targetEpisode = targetSeason.episodes.find(
      (episode) => episode.episodeNumber === req.params.ep
    );

    if (targetEpisode) {
      res.send(targetEpisode);
    } else {
      res.status(404).send("Episode not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving series data");
  }
});

app.get("/api/series/:id/:seasonNumber/:ep/qualities", async function (req, res) {
  try {
    const series = await Series.findById(req.params.id);

    const targetSeason = series.seasons.find(
      (season) => season.seasonNumber === req.params.seasonNumber
    );

    if (!targetSeason) {
      return res.status(404).send("Season not found");
    }

    const targetEpisode = targetSeason.episodes.find(
      (episode) => episode.episodeNumber === req.params.ep
    );

    if (!targetEpisode) {
      return res.status(404).send("Episode not found");
    }

    const qualities = targetEpisode.qualities;

    res.send(qualities);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving qualities data");
  }
});

app.get("/api/actors", async function (req, res) {
  try {
    const result = await Actor.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/actors/:id", async function (req, res) {
  try {
    const actor = await Actor.findById(req.params.id);
    res.send(actor);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving actor data");
  }
});

app.get("/api/actors/:id/relatedMovies", async function (req, res) {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      res.status(404).send("Actor not found");
      return;
    }

    if (actor) {
      res.send(actor.relatedMovies);
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving episode links");
  }
});

app.get("/api/actors/:id/relatedSeries", async function (req, res) {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      res.status(404).send("Actor not found");
      return;
    }

    if (actor) {
      res.send(actor.relatedSeries);
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving episode links");
  }
});

app.get("/api/search/:id", async function (req, res) {
  try {
    const searchTerm = req.params.id;
    const movies = [];
    const series = [];

    const movieResults = await Movie.findById(searchTerm);
    movies.push(movieResults);
    const seriesResults = await Series.findById(searchTerm);
    series.push(seriesResults);

    res.json({ movies, series });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving series data");
  }
});

app.get("/api/genre", async function (req, res) {
  try {
    const result = await Genre.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/lang", async function (req, res) {
  try {
    const result = await Lang.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/lang/:id", async function (req, res) {
  try {
    const lang = await Lang.findById(req.params.id);
    res.send(lang);
  } catch {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/lang/:id/movies", async function (req, res) {
  try {
    const lang = await Lang.findById(req.params.id);
    res.send(lang.movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/lang/:id/series", async function (req, res) {
  try {
    const lang = await Lang.findById(req.params.id);
    res.send(lang.series);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/year", async function (req, res) {
  try {
    const result = await Year.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/year/:id", async function (req, res) {
  try {
    const year = await Year.findById(req.params.id);
    res.send(year);
  } catch {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/year/:id/movies", async function (req, res) {
  try {
    const year = await Year.findById(req.params.id);
    res.send(year.movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/year/:id/series", async function (req, res) {
  try {
    const year = await Year.findById(req.params.id);
    res.send(year.series);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/genre/:id", async function (req, res) {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre);
  } catch {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/genre/:id/movies", async function (req, res) {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre.movies);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/trendmovies", async function (req, res) {
  try {
    const result = await Trendmovies.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/trendmovies/movies", async function (req, res) {
  try {
    const trendMovies = await Trendmovies.find({}); // Fetch all trend movies
    const moviesArray = trendMovies.map(trendMovie => trendMovie.movies); // Extract movies array from each trend movie
    const allMovies = [].concat(...moviesArray); // Concatenate all movies arrays into a single array
    res.json(allMovies); // Send the concatenated movies array
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/trendseries", async function (req, res) {
  try {
    const result = await Trendseries.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/trendseries/series", async function (req, res) {
  try {
    const trendSeries = await Trendseries.find({}); // Fetch all trend movies
    const seriesArray = trendSeries.map(trendSeries => trendSeries.series); // Extract movies array from each trend movie
    const allSeries = [].concat(...seriesArray); // Concatenate all movies arrays into a single array
    res.json(allSeries); // Send the concatenated movies array
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/genre/:id/series", async function (req, res) {
  try {
    const genre = await Genre.findById(req.params.id);
    res.send(genre.series);
  } catch {
    console.error(err);
    res.status(500).send("Internal Server Error", err);
  }
});

app.post("/api/trendmovies", async (req, res) => {
  const data = {
    _id: req.body._id,
    movies: req.body.movies,
  };
  try {
    const trendmovies = await Trendmovies.create(data);
    console.log("trending added:", trendmovies);
    res.send("trending added successfully");
  } catch (error) {
    console.error("Error adding trending:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/trendseries", async (req, res) => {
  const data = {
    _id: req.body._id,
    series: req.body.series,
  };
  try {
    const trendseries = await Trendseries.create(data);
    console.log("trending added:", trendseries);
    res.send("trending added successfully");
  } catch (error) {
    console.error("Error adding trending:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/genre", async (req, res) => {
  const data = {
    _id: req.body._id,
    genre: req.body.genre,
    movies: req.body.movies,
    series: req.body.series,
  };
  try {
    const genre = await Genre.create(data);
    console.log("genre added:", genre);
    res.send("genre added successfully");
  } catch (error) {
    console.error("Error adding actor:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/lang", async (req, res) => {
  const data = {
    _id: req.body._id,
    lang: req.body.lang,
    movies: req.body.movies,
    series: req.body.series,
  };
  try {
    const lang = await Lang.create(data);
    console.log("genre added:", lang);
    res.send("تم اضافة اللغة");
  } catch (error) {
    console.error("Error adding actor:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/year", async (req, res) => {
  const data = {
    _id: req.body._id,
    year: req.body.year,
    movies: req.body.movies,
    series: req.body.series,
  };
  try {
    const year = await Year.create(data);
    console.log("genre added:", year);
    res.send("تم اضافة السنه");
  } catch (error) {
    console.error("Error adding year:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/adddirector", async (req, res) => {
  const data = {
    id: req.body.ID,
    name: req.body.name,
    description: req.body.description,
    relatedMovies: req.body.relatedMovies,
    relatedSeries: req.body.relatedSeries,
  };

  // Assuming you have a Director model/schema defined in your project
  try {
    const director = await Director.create(data);
    console.log("Director added:", director);
    res.send("Actor added successfully");
  } catch (error) {
    console.error("Error adding actor:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addactor", async (req, res) => {
  const data = {
    _id: req.body._id,
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    relatedMovies: req.body.relatedMovies,
  };

  try {
    const actor = await Actor.create(data);
    console.log("Director added:", actor);
    res.send("Director added successfully");
  } catch (error) {
    console.error("Error adding director:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addmovie", async (req, res) => {
  try {
    const movieData = {
      _id: req.body._id,
      type: req.body.type,
      lang: req.body.lang,
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      description: req.body.description,
      poster: req.body.poster,
      qualities: req.body.qualities, // Updated to include qualities array
      actors: req.body.actors,
      trending: req.body.trending,
      trendpic: req.body.trendpic
    };

    const newMovie = await Movie.create(movieData);

    for (const actorId of movieData.actors) {
      await Actor.findByIdAndUpdate(actorId, {
        $addToSet: { relatedMovies: newMovie._id },
      });
    }

    for (const genreId of movieData.genre) {
      await Genre.findByIdAndUpdate(genreId, {
        $addToSet: { movies: newMovie._id },
      });
    }

    const langId = movieData.lang;
    await Lang.findByIdAndUpdate(langId, {
      $addToSet: { movies: newMovie._id },
    });

    const yearId = movieData.year;
    await Year.findByIdAndUpdate(yearId, {
      $addToSet: { movies: newMovie._id },
    });


    if (movieData.trending) {
      await Trendmovies.updateOne(
        {},
        { $addToSet: { movies: newMovie._id } },
        { upsert: true }
      );
    }

    console.log("Movie added:", newMovie);
    res.send("تمت أضافة الفيلم بنجاح");
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).send(`Internal Server Error: ${error}`);
  }
});

app.post("/addseries", async (req, res) => {
  try {
    const seriesData = {
      _id: req.body._id,
      type: req.body.type,
      lang: req.body.lang,
      title: req.body.title,
      genre: req.body.genre,
      year: req.body.year,
      description: req.body.description,
      seasons: req.body.seasons,
      poster: req.body.poster,
      actors: req.body.actors, 
    };

    const newSeries = await Series.create(seriesData);

    // Update relatedMovies field in the Actor model for each actor associated with the Series
    for (const actorId of seriesData.actors) {
      await Actor.findByIdAndUpdate(actorId, {
        $addToSet: { relatedSeries: newSeries._id },
      });
    }

    for (const genreId of seriesData.genre) {
      await Genre.findByIdAndUpdate(genreId, {
        $addToSet: { series: newSeries._id },
      });
    }

    const langId = seriesData.lang;
    await Lang.findByIdAndUpdate(langId, {
      $addToSet: { series: newSeries._id },
    });

    if (seriesData.trending) {
      await Trendseries.updateOne(
        {},
        { $addToSet: { series: newSeries._id } },
        { upsert: true }
      );
    }

    console.log("Series added:", newSeries);
    res.send("تمت أضافة المسلسل بنجاح");
  } catch (error) {
    console.error("Error adding series:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.patch("/addseason/:seriesId", async (req, res) => {
  const seriesId = req.params.seriesId;
  const { seasonNumber, episodes } = req.body;

  try {
    // Find the existing series by its ID
    let existingSeries = await Series.findById(seriesId);

    if (!existingSeries) {
      return res.status(404).send("Series not found");
    }

    // Check if the season already exists in the series
    let existingSeason = existingSeries.seasons.find(season => season.seasonNumber === seasonNumber);

    if (!existingSeason) {
      // If the season doesn't exist, create a new one and add episodes
      existingSeason = {
        seasonNumber,
        episodes: []
      };
      existingSeries.seasons.push(existingSeason);
    }

    // Add the new episodes to the existing or newly created season
    existingSeason.episodes.push(...episodes);

    // Save the updated series document
    await existingSeries.save();

    console.log("Episodes added to season:", existingSeason);
    res.send("تمت إضافة الحلقات بنجاح");
  } catch (error) {
    console.error("Error adding episodes to season:", error);
    res.status(500).send("Internal Server Error");
  }
});


const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(5000, () => {
      console.log(`server is listening on port 5000`);
    });
  } catch (err) {
    console.log(err);
  }
};

startServer();

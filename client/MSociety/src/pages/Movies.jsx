import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import Card from "../components/Card.jsx";

const Movies = () => {
  const [movieData, setMovieData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("allGenres");
  const [langData, setLangData] = useState([])
  const [selectedLang, setSelectedLang] = useState("allLangs")

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies").then((res) => {
      setMovieData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/genre").then((res) => {
      setGenreData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/lang").then((res) => {
      setLangData(res.data);
    });
  }, []);

  useEffect(() => {
    if (selectedGenre !== "allGenres") {
      axios
        .get(`http://localhost:5000/api/genre/${selectedGenre}/movies`)
        .then((res) => {
          const movieIds = res.data;
          const promises = movieIds.map((id) =>
            axios.get(`http://localhost:5000/api/movies/${id}`)
          );
          Promise.all(promises)
            .then((responses) => {
              const movieData = responses.map((response) => response.data);
              setMovieData(movieData);
            })
            .catch((error) => {
              console.error("Error fetching movie data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching genre movies:", error);
        });
    } else {
      axios
        .get("http://localhost:5000/api/movies")
        .then((res) => {
          setMovieData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching all movies:", error);
        });
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (selectedLang !== "allLangs") {
      axios
        .get(`http://localhost:5000/api/lang/${selectedLang}/movies`)
        .then((res) => {
          const movieIds = res.data;
          const promises = movieIds.map((id) =>
            axios.get(`http://localhost:5000/api/movies/${id}`)
          );
          Promise.all(promises)
            .then((responses) => {
              const movieData = responses.map((response) => response.data);
              setMovieData(movieData);
            })
            .catch((error) => {
              console.error("Error fetching movie data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching lang movies:", error);
        });
    } else {
      // Fetch all movies if "allLangs" is selected
      axios
        .get("http://localhost:5000/api/movies")
        .then((res) => {
          setMovieData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching all movies:", error);
        });
    }
  }, [selectedLang]);
  

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleLangChange = (event) => {
    setSelectedLang(event.target.value);
  };

  return (
    <>
      <Header />
      <div className={"  lg:fixed text-white lg:mr-[70px] lg:mt-[120px]"}>
        <div className={"flex items-center lg:pt-[60px] pt-[120px] pr-[50px] pl-[50px] gap-10"}>
          <h4 className="text-white pr-4 border-r-2 border-solid border-red-600 text-2xl">
            جميع الأفلام
          </h4>
          <select
            className=" absolute lg:relative left-[20px] border-none rounded-[30px] outline-none bg-red-600 text-white p-1 text-sm font-medium items-center lg:mr-[200px]"
            onChange={handleLangChange}
          >
            <option
              className="p-1 border-none outline-none"
              value="allLangs"
              key={"allLangs"}
            >
              جميع اللغات
            </option>
            {langData.map((lang) => (
              <option
                className="p-1 border-none outline-none"
                key={lang.id}
                value={lang.id}
              >
                {lang.lang}
              </option>
            ))}
          </select>
          <select
            className=" absolute lg:relative left-[220px] border-none rounded-[30px] outline-none bg-red-600 text-white p-1 text-sm font-medium items-center lg:mr-[200px]"
            onChange={handleGenreChange}
          >
            <option
              className="p-1 border-none outline-none"
              value="allGenres"
              key={"allGenres"}
            >
              جميع الأنواع
            </option>
            {genreData.map((genre) => (
              <option
                className="p-1 border-none outline-none"
                key={genre.id}
                value={genre.id}
              >
                {genre.genre}
              </option>
            ))}
          </select>
        </div>
        <div className="text-white fixed lg:mr-[70px] mt-0 overflow-x-auto">
          <div className=" grid lg:grid-cols-7  grid-cols-2 mt-[60px]">
            {movieData.map((movie) => (
              <Card
                type={movie.type}
                id={movie._id}
                poster={movie.poster}
                title={movie.title}
                genre={movie.genre}
                key={movie._id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;

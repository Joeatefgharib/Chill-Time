import Header from "../components/Header.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import { useParams } from "react-router-dom";

const Series = () => {

  const [seriesData, setSeriesData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("allGenres");
  const [langData, setLangData] = useState([])
  const [selectedLang, setSelectedLang] = useState("allLangs")

  useEffect(() => {
    axios.get("http://localhost:5000/api/series").then((res) => {
      setSeriesData(res.data);
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
        .get(`http://localhost:5000/api/genre/${selectedGenre}/series`)
        .then((res) => {
          const seriesIds = res.data;
          const promises = seriesIds.map((id) =>
            axios.get(`http://localhost:5000/api/series/${id}`)
          );
          Promise.all(promises)
            .then((responses) => {
              const seriesData = responses.map((response) => response.data);
              setSeriesData(seriesData);
            })
            .catch((error) => {
              console.error("Error fetching series data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching genre movies:", error);
        });
    } else {
      axios
        .get("http://localhost:5000//api/series")
        .then((res) => {
          setSeriesData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching all series:", error);
        });
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (selectedLang !== "allLangs") {
      axios
        .get(`http://localhost:5000/api/lang/${selectedLang}/series`)
        .then((res) => {
          const movieIds = res.data;
          const promises = movieIds.map((id) =>
            axios.get(`http://localhost:5000/api/series/${id}`)
          );
          Promise.all(promises)
            .then((responses) => {
              const seriesData = responses.map((response) => response.data);
              setSeriesData(seriesData);
            })
            .catch((error) => {
              console.error("Error fetching series data:", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching lang series:", error);
        });
    } else {
      // Fetch all movies if "allLangs" is selected
      axios
        .get("http://localhost:5000/api/series")
        .then((res) => {
          setSeriesData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching all series:", error);
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
      <div className={"  lg:fixed text-white lg:mr-[100px] lg:mt-[120px]"}>
        <div className={"flex items-center lg:pt-[60px] pt-[120px] lg:pr-[50px] lg:pl-[50px] "}>
          <h4 className="text-2xl lg:relative absolute right-3 pr-4  border-r-2 border-solid border-red-600">
            جميع المسلسلات
          </h4>
          <select
            className=" absolute lg:relative left-[30px] border-none  rounded-[30px] outline-none bg-red-600 text-white p-1 text-sm font-medium items-center mr-[200px]"
            onChange={handleGenreChange}
          >
            <option
              className=" p-1 border-none outline-none"
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
              className=" p-1 border-none outline-none"
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
        <div className=" text-white fixed lg:mr-[70px] mt-0 overflow-x-auto">
          <div className={` grid lg:grid-cols-7  grid-cols-2 mt-[60px]`}>
            {seriesData.map((series) => {
              return (
                <Card
                  type={series.type}
                  id={series._id}
                  poster={series.poster}
                  title={series.title}
                  genre={series.genre}
                  key={series._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Series;

import Header from "../components/Header.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";

const Series = () => {
  const [seriesData, setSeriesData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("allGenres");
  const [langData, setLangData] = useState([]);
  const [selectedLang, setSelectedLang] = useState("allLangs");
  const [trendSeries, setTrendSeries] = useState([]);

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
        .get("http://localhost:5000/api/series")
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
 
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trendseries/series")
      .then(async (res) => {
        const trendSeriesIds = res.data;
        const seriesDetailsPromises = trendSeriesIds.map(async (seriesId) => {
          const seriesDetails = await axios.get(
            `http://localhost:5000/api/series/${seriesId}`
          );
          return seriesDetails.data;
        });

        // Wait for all promises to resolve and set trendMovies to an array of movie details
        Promise.all(seriesDetailsPromises)
          .then((seriesDetails) => {
            setTrendSeries(seriesDetails);
          })
          .catch((error) => {
            console.error("Error fetching movie details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching trend movies:", error);
      });
  }, []);


  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleLangChange = (event) => {
    setSelectedLang(event.target.value);
  };

  return (
    <>
      <Header />
      <div className={"lg:absolute text-white lg:mr-[100px] lg:mt-[120px]"}>
        <div
          className={
            "flex items-center lg:pt-[60px] pt-[120px] lg:pr-[50px] lg:pl-[50px] "
          }
        >
          <h4 className="text-2xl lg:relative absolute right-3 pr-4  border-r-2 border-solid border-red-600">
            المسلسلات المشهوره
          </h4>
        </div>
        <Swiper
          id="series"
          className="lg:grid lg:grid-cols-8 lg:mt-[30px] lg:mr-[30px] lg:mb-[30px] lg:ml-[30px] lg:p-0 grid grid-cols-2 items-center pt-8 pr-1 pl-1"
          spaceBetween={10}
          slidesPerView={8} // Display 8 cards per view
          pagination={{ clickable: true }}
        >
          {trendSeries
            .slice()
            .reverse()
            .map((series) => (
              <SwiperSlide key={series._id}>
                <Card
                  type={series.type}
                  id={series._id}
                  poster={series.poster}
                  title={series.title}
                  genre={series.genre}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div
          className={
            "flex items-center lg:pt-[60px] pt-[120px] lg:pr-[50px] lg:pl-[50px] "
          }
        >
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
        <div className=" text-white absolute lg:mr-[70px] mt-0">
          <div className={` grid lg:grid-cols-7 lg:gap-[220px]  grid-cols-2 mt-[60px]`}>
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

import Header from "../components/Header.jsx";
import Banner from "../components/Banner.jsx";
import Card from "../components/Card.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "./home.css";

const Home = () => {
  const [movieData, setMovieData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [trendMovies, setTrendMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/movies").then((res) => {
      setMovieData(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/series").then((res) => {
      setSeriesData(res.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trendmovies/movies")
      .then(async (res) => {
        const trendMovieIds = res.data;
        const movieDetailsPromises = trendMovieIds.map(async (movieId) => {
          const movieDetails = await axios.get(
            `http://localhost:5000/api/movies/${movieId}`
          );
          return movieDetails.data;
        });

        // Wait for all promises to resolve and set trendMovies to an array of movie details
        Promise.all(movieDetailsPromises)
          .then((movieDetails) => {
            setTrendMovies(movieDetails);
          })
          .catch((error) => {
            console.error("Error fetching movie details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching trend movies:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        scrollbar={{ draggable: true }}
      >
        {trendMovies.map((movie) => (
          <SwiperSlide key={movie.id} className=" bg-red-600">
            <Banner
              id={movie._id}
              trendpic={movie.trendpic}
              title={movie.title}
              year={movie.year}
              length={movie.length}
              genre={movie.genre}
              description={movie.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div id="moviesLink" className=" relative lg:items-center">
        <h3
          id="movieHomePage"
          className=" pr-[15px] border-r-2 border-solid border-red-600 text-white text-2xl mt-[30px] mr-[40px]"
        >
          أفلام
        </h3>
        <Link to={`/movies`}>
          <button
            id="moviesLinkBtn"
            className="  w-[100px] bg-red-600 text-white rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-white hover:text-red-600 absolute lg:top-[0px] lg:left-[100px] lg:p-1 top-0 left-6 "
          >
            شاهد الكل
          </button>
        </Link>
      </div>
      <div
        id={`movies`}
        className=" lg:flex lg:mt-[30px] lg:mr-[120px] lg:mb-[30px] lg:ml-[0] lg:p-0 grid grid-cols-2  items-center pt-8 pr-1 pl-1 "
      >
        {movieData.map((movie) => {
          return (
            <Card
              type={movie.type}
              id={movie._id}
              poster={movie.poster}
              title={movie.title}
              genre={movie.genre}
              key={movie._id}
            />
          );
        })}
      </div>
      <div id="seriesLink" className=" relative lg:pt-16">
        <h3
          id="seriesHomePage"
          className=" pr-[15px] border-r-2 border-solid border-red-600 text-white text-2xl mt-[30px] mr-[40px]"
        >
          مسلسلات
        </h3>
        <Link to={`/series`}>
          <button
            id="seriesLinkBtn"
            className=" w-[100px] bg-red-600 text-white rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-white hover:text-red-600 absolute lg:top-[94px] lg:left-[100px] lg:p-1 top-0 left-6 "
          >
            شاهد الكل
          </button>
        </Link>
      </div>
      <div
        id={`series`}
        className=" lg:flex lg:mt-[30px] lg:mr-[120px] lg:mb-[30px] lg:ml-[0] lg:p-0 grid grid-cols-2  items-center pt-8 pr-1 pl-1"
      >
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
    </>
  );
};

export default Home;

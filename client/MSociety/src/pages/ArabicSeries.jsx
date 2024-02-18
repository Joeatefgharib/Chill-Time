import Header from "../components/Header.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";

const ArabicSeries = () => {

  const [seriesData, setSeriesData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("allGenres");

  useEffect(() => {
    axios.get("http://localhost:5000/api/lang/عربي").then((res) => {
      const result = res.data;
      const seriesIds = result.series;
      const promises = seriesIds.map((id) =>
        axios.get(`http://localhost:5000/api/series/${id}`)
      );
  
      Promise.all(promises)
        .then((responses) => {
          const seriesDetails = responses.map((response) => response.data);
          setSeriesData(seriesDetails);
          setLoading(false); // Set loading to false when all series details are fetched
        })
        .catch((error) => {
          console.error("Error fetching series details:", error);
          setLoading(false); // Set loading to false even if fetching series details fails
        });
    }).catch((error) => {
      console.error("Error fetching series IDs:", error);
      setLoading(false); // Set loading to false even if fetching series IDs fails
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/genre").then((res) => {
      setGenreData(res.data);
    });
  }, []);

  

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
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
            {Array.isArray(seriesData) && seriesData.length > 0 ? (
              // If seriesData is an array and not empty, render <Card> components
              seriesData.map((series) => (
                <Card
                  type={series.type}
                  id={series._id}
                  poster={series.poster}
                  title={series.title}
                  genre={series.genre}
                  key={series._id}
                />
              ))
            ) : (
              // If seriesData is not an array or is empty, display the message
              <div className=" w-[400px] text-2xl">لم يتم اضافة مسلسلات عربيه في الوقت الحالي الرجاء حاول لاحقا</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArabicSeries;

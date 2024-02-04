import React, { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import { useParams } from "react-router-dom";
import Card from "../components/Card.jsx";
import axios from "axios";

const SearchPage = () => {
  const { id } = useParams();

  const [searchData, setSearchData] = useState([]);
  const [series, setSeries] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://msociety.onrender.com/api/search/${id}`)
      .then((response) => {
        setSearchData(response.data);
        setMovies(response.data.movies);
        setSeries(response.data.series);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(movies);
  console.log(series);

  return (
    <>
      <Header />
      <div className=" pt-[150px] pr-[100px] ">
        <h2 className=" text-white text-2xl pr-4 border-r-2 border-solid border-red-600">نتائج البحث ل{id}</h2>
        <div className=" lg:flex grid grid-cols-1 mt-8">
          {movies.length > 0 && (
            <>
              <h3 className=" text-gray-500 text-xl">أفلام</h3>
              {movies.map(
                (item) =>
                  item &&
                  item.type && (
                    <Card
                      type={item.type}
                      id={item._id}
                      poster={item.poster}
                      title={item.title}
                      genre={item.genre}
                      key={item._id}
                    />
                  )
              )}
            </>
          )}
        </div>
        <div className=" mt-[60px]">
          {series.length > 0 && (
            <>
              <h3 className="text-gray-500 text-xl">مسلسلات</h3>
              {series.map(
                (item) =>
                  item &&
                  item.type && (
                    <Card
                      type={item.type}
                      id={item._id}
                      poster={item.poster}
                      title={item.title}
                      genre={item.genre}
                      key={item._id}
                    />
                  )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;

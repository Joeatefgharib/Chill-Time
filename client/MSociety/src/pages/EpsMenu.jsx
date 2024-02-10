import Episode from "../components/Episode.jsx";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const EpsMenu = () => {
  const { id } = useParams();
  const { seasonNumber } = useParams();
  const [activeSeason, setActiveSeason] = useState(seasonNumber);

  useEffect(() => {
    // Store selected season in storage
    localStorage.setItem("activeSeason", activeSeason);
  }, [activeSeason]);

  const [seriesData, setSeriesData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/series/${id}`)
      .then((response) => {
        console.log(response.data);
        setSeriesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [episodesData, setEpisodesData] = useState([]);
  useEffect(() => {
    if (activeSeason) {
      axios
        .get(`http://localhost:5000/api/series/${id}/${activeSeason}/episodes`)
        .then((response) => {
          console.log(response.data);
          setEpisodesData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [activeSeason, id]);

  const [seasonData, setSeasonData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/series/${id}/seasons`)
      .then((response) => {
        console.log(response.data);
        setSeasonData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const closeBtnNavigate = () => {
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(
      0,
      currentPath.lastIndexOf(":seasonNumber/episodes")
    );
    navigate(`${basePath}/series/${id}`);
  };

  const navigate = useNavigate();

  const handleSeasonClick = (seasonNumber) => {
    setActiveSeason(seasonNumber);
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(
      0,
      currentPath.lastIndexOf(":seasonNumber/episodes")
    );
    navigate(`${basePath}/series/${id}/${seasonNumber}/episodes`);
  };

  const StyledContainer = styled.div`
    position: relative;
    &::before{
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url(${seriesData.poster});
    background-size: cover;
    filter: blur(5px) brightness(0.2);
    z-index: -1;
    `;

  return (
    <StyledContainer>
      <IoMdCloseCircle
        className={
          " absolute left-4 top-4 lg:mt-[100px] lg:ml-[50px] lg:w-[3.5em] lg:h-[3.5em] w-[3em] h-[3em] text-white cursor-pointer"
        }
        onClick={closeBtnNavigate}
      />
      <div className={" lg:absolute lg:mt-[100px] lg:mr-[50px] mr-5 pt-8"}>
        <h2 className=" lg:text-3xl text-2xl text-white">المواسم</h2>
        <div className=" grid">
          {seasonData.map((season, index) => (
            <a
              key={index}
              className={` font-medium cursor-pointer lg:pt-[20px] pt-3 lg:text-3xl text-2xl ${
                activeSeason === season.seasonNumber ? " text-white" : " text-gray-600"
              }`}
              onClick={() => {
                handleSeasonClick(season.seasonNumber);
              }}
            >
              الموسم {index + 1}
            </a>
          ))}
        </div>
      </div>
      <div className={" lg:absolute lg:top-[120px] lg:right-[420px] mr-5 mt-8"}>
        <h3 className={" text-white lg:text-3xl text-2xl lg:mb-[40px] mb-5"}>
          الحلقات
        </h3>
        {episodesData.map((episode) => (
          <Episode
            key={episode.episodeNumber}
            episodeNumber={episode.episodeNumber}
            title={episode.title}
            description={seriesData.description}
            img={episode.img}
          />
        ))}
      </div>
    </StyledContainer>
  );
};

export default EpsMenu;

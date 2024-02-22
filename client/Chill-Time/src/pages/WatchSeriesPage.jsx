import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import styled from "styled-components";

const WatchSeriesPage = () => {
  const navigate = useNavigate();
  const closeBtnNavigate = () => {
    navigate(-1);
  };
  const { id, seasonNumber, ep, type } = useParams();

  const [seriesData, setSeriesData] = useState([]);
  useEffect(() => {
    axios
      .get(`http://89.116.110.212:5000/api/series/${id}`)
      .then((response) => {
        console.log(response.data);
        setSeriesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [episode, setEpisode] = useState(null);
  useEffect(() => {
    axios
      .get(`http://89.116.110.212:5000/api/series/${id}/${seasonNumber}/${ep}/qualities`)
      .then((response) => {
        console.log(response.data);
        const selectedEpisode = response.data.find(episode => episode.type === type);
        setEpisode(selectedEpisode);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, seasonNumber, ep, type]);

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
          "lg:absolute lg:left-0 lg:mt-[135px] lg:ml-[50px] lg:w-[3.5em] lg:h-[3.5em] w-[0] h-[0] text-white cursor-pointer"
        }
        onClick={closeBtnNavigate}
      />
      <div className="lg:absolute lg:mt-[100px] lg:mr-[50px] lg:w-full lg:h-[100vh] space-y-6">
        <h2 className="cursor-pointer text-white lg:text-3xl mr-12  text-2xl mt-12">
          {seriesData.title}
        </h2>
        {episode ? (
          <iframe
          className="lg:absolute lg:items-center lg:mt-[50px] lg:mr-[150px] lg:w-[1200px] lg:h-[600px] w-[350px] h-[300px] mr-6 mt-10"
          width="1200"
          height="620"
          src={episode.link}
          scrolling="no"
          frameborder="0"
          allowfullscreen="true"
        ></iframe>
        ) : (
          <p className="text-white lg:text-lg text-base mt-5">
            الحلقة غير متوفرة بجودة {type}. يرجى المحاولة بجودة أخرى.
          </p>
        )}
      </div>
    </StyledContainer>
  );
};

export default WatchSeriesPage;

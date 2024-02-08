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
  const { id } = useParams();
  const {seasonNumber} = useParams()
  const {ep} = useParams()

  const { type } = useParams()
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://msociety.onrender.com/api/series/${id}`)
      .then((response) => {
        console.log(response.data);
        setSeriesData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const [episode, setEpisode] = useState([]);
  useEffect(() => {
    axios
      .get(`https://msociety.onrender.com/api/series/${id}/${seasonNumber}/${ep}`)
      .then((response) => {
        console.log(response.data);
        setEpisode(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

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
      <div className="lg:absolute lg:mt-[100px] lg:mr-[50px] lg:w-full lg:h-[100vh]">
        <h2 className="ursor-pointer text-white lg:text-3xl mr-12  text-2xl mt-12">
          {seriesData.title}
        </h2>
        <video
            src={`${episode.link}`}
            controls={true}
            autoPlay={true}
          ></video>
      </div>
    </StyledContainer>
  );
};

export default WatchSeriesPage;

import React from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const WatchMoviePage = () => {
    const navigate = useNavigate()
    const closeBtnNavigate = () => {navigate(-1)}

    const {id} = useParams()
    const [movieData, setMovieData] = useState([]);
    useEffect(() => {
        axios.get(`https://msociety.onrender.com/api/movies/${id}`)
            .then(response => {
                console.log(response.data)
                setMovieData(response.data);
            })
            .catch(error => {
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
        background: url(${movieData.poster});
        background-size: cover;
        filter: blur(5px) brightness(0.2);
        z-index: -100;
    `;

  return (
    <StyledContainer >
        <IoMdCloseCircle className={' lg:absolute lg:left-0 lg:mt-[135px] lg:ml-[50px] lg:w-[3.5em] lg:h-[3.5em] w-[0] h-[0] text-white cursor-pointer'} onClick={closeBtnNavigate}/>   
        <div className=' lg:absolute lg:mt-[100px] lg:mr-[50px] lg:w-full lg:h-[100vh]'>
            <h2 onClick={closeBtnNavigate} className=' cursor-pointer text-white lg:text-3xl mr-12  text-2xl mt-12'>{movieData.title}</h2>
            <iframe className=' lg:absolute lg:items-center lg:mt-[50px] lg:mr-[150px] lg:w-[1200px] lg:h-[600px] w-[350px] h-[300px] mr-6 mt-10 ' src="https://do0od.com/e/vjyfunf5zdbdnzo6xbzpskhnlmrilsol" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>
        </div>
    </StyledContainer>
  )
}

export default WatchMoviePage
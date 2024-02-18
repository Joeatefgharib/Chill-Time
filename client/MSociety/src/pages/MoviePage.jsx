import Header from "../components/Header.jsx";
import MovieWatchBtn from '../components/MovieWatchBtn.jsx';
import ActorCard from '../components/ActorCard.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovieDownloadbtn from "../components/MovieDownloadBtn.jsx";

const MoviePage = () => {
    
    const {id} = useParams()
    const [movieData, setMovieData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                console.log(response.data)
                setMovieData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const [actorsData, setActorsData] = useState([]);
    const [actorDetails, setActorDetails] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}/actors`)
        .then(response => {
            console.log(response.data)
            setActorsData(response.data);
    
            const actorDetailsPromises = response.data.map(actorId =>
                axios.get(`http://localhost:5000/api/actors/${actorId}`)
                    .then(response => response.data)
            );
    
            Promise.all(actorDetailsPromises)
                .then(actorDetails => {
                    console.log(actorDetails);
                    setActorDetails(actorDetails);
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            console.log(error);
        });
    
    }, [id]);

    const StyledContainer = styled.div`
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      color: white;
      overflow-x: hidden; /* Hide horizontal overflow */
      overflow-y: auto;   /* Enable vertical scrolling */
      
      @media (max-width: 768px) {
        padding-top: 200px; /* Padding for mobile devices */
      }
    
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(${movieData.poster});
        background-size: cover;
        filter: blur(5px) brightness(0.2);
        z-index: -1;
      }
    `;
    

    return(
        <>
            <Header />
            <StyledContainer  >
                <div id={'Btns'} className="lg:inline-grid lg:gap-3 lg:top-[225px] lg:left-[100px]  absolute top-[480px] left-[50px]  ">
                    <MovieWatchBtn  />
                    <MovieDownloadbtn />
                </div>
                <div id={'movieContent'} className="lg:flex lg:items-center lg:justify-between grid gap-10 ">
                    <img id={'img'} className="w-[240px] h-[355px] rounded-2xl lg:mr-[100px] lg:mt-0 mr-[75px] mt-[100px]" alt={`${movieData._id}`} src={movieData.poster} />
                    <div id={'infoContent'} className=" h-[360px] mr-[50px] pt-8">
                     <h1 className=" lg:text-4xl text-3xl">{movieData.title}</h1>
                        <p className=" text-gray-500 mt-[10px]">{movieData.duration}</p>
                        <h3 className=" lg:text-2xl text-xl mt-[10px]">القصة</h3>
                        <p className="text-gray-500 mt-[10px] w-4/6" >{movieData.description}</p>
                        <h3 className=" lg:text-2xl text-xl mt-[10px]">طاقم العمل</h3>
                        <div className={'lg:flex grid grid-cols-2 items-center gap-[20px]'}>
                            {actorDetails.map(actor => {
                                return <ActorCard name={actor.name} id={actor._id} image={actor.image} key={actor._id} />
                            })}
                        </div>
                    </div>
                </div>
            </StyledContainer>
        </>
    )
}

export default MoviePage
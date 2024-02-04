import React, { useState, useEffect } from 'react'
import Header from '../components/Header.jsx'
import { useParams } from 'react-router-dom'
import ActorImgComponent from '../components/ActorImgComponent.jsx'
import styled from 'styled-components'
import axios from 'axios'
import Card from '../components/Card.jsx'

const ActorPage = () => {

    const {id} = useParams()
    const [actorData, setActorData] = useState([])
    const [relatedMovies, setRelatedMovies] = useState([])
    const [movieData, setMovieData] = useState([])
    const [relatedSeries, setRelatedSeries] = useState([])
    const [seriesData, setSeriesData] = useState([])

    useEffect(() => {
        axios.get(`https://msociety.onrender.com/api/actors/${id}`)
        .then(response => {
            setActorData(response.data);

            axios.get(`https://msociety.onrender.com/api/actors/${id}/relatedMovies`)
            .then(async response => {
                const moviesData = await Promise.all(response.data.map(async movieId => {
                    const movieResponse = await axios.get(`https://msociety.onrender.com/api/movies/${movieId}`);
                    console.log(movieResponse.data)
                    return movieResponse.data;
            }));
                setMovieData(moviesData); // Update movieData state with movie details
            })
            axios.get(`https://msociety.onrender.com/api/actors/${id}/relatedSeries`)
            .then(async response => {
                const seriesData = await Promise.all(response.data.map(async SeriesId => {
                    const SeriesResponse = await axios.get(`https://msociety.onrender.com/api/series/${SeriesId}`);
                    console.log(SeriesResponse.data)
                    return SeriesResponse.data;
            }));
                setSeriesData(seriesData); // Update movieData state with movie details
            })
        })
        .catch(error => {
            console.log(error);
        });
    }, [id]);

    

    const StyledContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    color: white;
    &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url(${actorData.image});
    background-size: cover;
    filter: blur(100px) brightness(0.2);
    z-index: -1;
    `;

  return (
    <>
        <Header />
        <StyledContainer>
            <div className=' lg:flex grid'>
                <ActorImgComponent id={actorData._id} image={actorData.image} />
                <div className=' lg:mt-[160px] lg:ml-[170px] w-3/4 mr-12 mt-8'>
                    <h2 className=' text-4xl pb-5'>{actorData.name}</h2>
                    <p className=' text-gray-500'>{actorData.description}</p>
                </div>
            </div>
            <div className='mt-[50px]'>
                <h1 className='mt-1/2 lg:mr-[100px] mr-12 text-4xl'>أفلامه</h1>
                <div className=' lg:flex lg:mr-[100px] mr-8 grid grid-cols-2 gap-6'>
                    {movieData.map(movie => {
                        return(
                            <Card type={movie.type} id={movie._id} poster={movie.poster} title={movie.title} genre={movie.genre}
                            key={movie._id}/>
                        )
                    })}
                </div>
            </div>
            <div>
                <h1 className='mt-1/2 lg:mr-[100px] mr-12 text-4xl'>مسلسلاته</h1>
                <div className='lg:flex lg:mr-[100px] mr-8 grid grid-cols-2 gap-6'>
                    {seriesData.map(series => {
                        return(
                            <Card type={series.type} id={series._id} poster={series.poster} title={series.title} genre={series.genre}
                            key={series._id}/>
                        )
                    })}
                </div>
            </div>
        </StyledContainer>
    </>
  )
}

export default ActorPage
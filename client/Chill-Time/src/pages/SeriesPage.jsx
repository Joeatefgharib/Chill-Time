import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import SeriesWatchBtn from "../components/SeriesWatchBtn.jsx";
import ActorCard from '../components/ActorCard.jsx';
import { useState, useEffect } from 'react';
import axios from "axios";
import {Helmet} from 'react-helmet-async'
import styled from 'styled-components';
import SeriesDownloadBtn from "../components/SeriesDownloadBtn.jsx";

const SeriesPage = () => {
    const { id } = useParams();
    const [seriesData, setSeriesData] = useState([]);
    const [actorsData, setActorsData] = useState([]);
    const [actorDetails, setActorDetails] = useState([]);
    
    useEffect(() => {
        axios.get(`http://89.116.110.212:5000/api/series/${id}`)
            .then(response => {
                console.log(response.data)
                setSeriesData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        axios.get(`http://89.116.110.212:5000/api/series/${id}/actors`)
            .then(response => {
                console.log(response.data)
                setActorsData(response.data);
    
                const actorDetailsPromises = response.data.map(actorId =>
                    axios.get(`http://89.116.110.212:5000/api/actors/${actorId}`)
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
        min-height: 100vh;
        display: flex;
        align-items: center;
        overflow-x: hidden; /* Hide horizontal overflow */
        overflow-y: auto;   /* Enable vertical scrolling */
        color: white;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: url(${seriesData.poster});
            background-size: cover;
            filter: blur(5px) brightness(0.2);
            z-index: -1;
        }
    `;

    return (
        <>
        <Helmet>
                <title>مشاهدة مسلسل {`${seriesData.title}`} بجودة عالية على Chill Time</title>
		<meta name="keywords" content={`تحميل ومشاهدة مسلسل ${seriesData.title} مترجم`} />
                <meta name="description" content={`${seriesData.description}`}/>
        </Helmet>

            <Header />
            <StyledContainer>
                <div className=" absolute lg:grid lg:gap-3 lg:top-[225px] lg:left-[100px] lg:mt-0 mt-[100px] left-[90px]">
                    <SeriesWatchBtn />
                    <SeriesDownloadBtn />
                </div>
                <div id="seriesContent" className="lg:flex lg:items-center lg:justify-between grid gap-10 ">
                    <img id="img" className="w-[240px] h-[355px] rounded-2xl lg:mr-[100px] lg:mt-0 mr-[75px] mt-[100px]" alt={`${seriesData._id}`} src={seriesData.poster} />
                    <div id="seriesInfoContent" className=" h-[360px] mr-[50px] pt-8">
                        <h1 className=" lg:text-4xl text-3xl">{seriesData.title}</h1>
                        <p className=" text-gray-500 mt-[10px]">2h 8m</p>
                        <h3 className=" lg:text-2xl text-xl mt-[10px]">القصه</h3>
                        <p className="text-gray-500 mt-[10px] w-4/6">{seriesData.description}</p>
                        <h3 className=" lg:text-2xl text-xl mt-[10px]">طاقم العمل</h3>
                        <div className="lg:flex grid grid-cols-2 items-center gap-[20px]">
                            {actorDetails.map(actor => {
                                return <ActorCard name={actor.name} id={actor._id} image={actor.image} key={actor._id} />;
                            })}
                        </div>
                    </div>
                </div>
            </StyledContainer>
        </>
    );
};

export default SeriesPage;

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
const SeriesWatchBtn = (props) => {

  const { navigate } = props;

  const { id } = useParams()

  const navigateRoute = useNavigate();

  const [ seasons, setSeasonsData ] = useState([]);
  useEffect(() => {
    axios
      .get(`http://89.116.110.212:5000/api/series/${id}/seasons`)
      .then((response) => {
        console.log(response.data[0]);
        setSeasonsData(response.data[0] )
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <>
    {console.log(seasons.seasonNumber)}
      <button
        className={
          "w-[100px] bg-red-600 text-white rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-white hover:text-red-600 ml-10"
        }
        onClick={() => navigateRoute(`${seasons.seasonNumber}/episodes`)}
      >
        شاهد الأن
      </button>
    </>
  );
};

export default SeriesWatchBtn;

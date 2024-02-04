import {useNavigate} from "react-router-dom";

const SeriesWatchBtn = (props) => {

    const {navigate} = props;

    const navigateRoute = useNavigate()

    return(
        <>
            <button className={"w-[100px] bg-red-600 text-white rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-white hover:text-red-600 ml-10"} onClick={() => navigateRoute(`1/episodes`)} >شاهد الأن</button>
        </>
    )
}

export default SeriesWatchBtn
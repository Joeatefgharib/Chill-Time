import PropTypes from 'prop-types';
import {useNavigate} from "react-router-dom";

const MovieWatchBtn = () => {

    const navigateRoute = useNavigate()

    return(
        <>
            <button className={" w-[100px] bg-red-600 text-white rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-white hover:text-red-600 lg:ml-0 ml-10"} onClick={() => navigateRoute(`watch`)} >شاهد الأن</button>
        </>
    )
}

MovieWatchBtn.propTypes = {
    navigate: PropTypes.string
};

export default MovieWatchBtn
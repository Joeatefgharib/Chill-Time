import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';


const Card = ({type, id, poster, title, genre}) => {

    return(
        <div id='bx' className=' relative w-[180px] h-[290px] m-[10px] rounded-[20px] lg:mb-[80px] mb-[60px] ' key={id}>
            <Link to={`/${type}/${id}`}>
                    <img className=' w-full h-full rounded-[20px] ' alt={`${id}`} src={`${poster}`}/>
                <div id='details' className=' absolute w-full h-[25%] z-[1]'>
                    <h3 className=' text-white pt-[5px] pl-[5px] text-lg m-0 cursor-pointer'>{`${title}`}</h3>
                    <p className='text-red-600 m-0 text-sm cursor-pointer pl-[5px]'>{genre[0]}</p>
                </div>
            </Link>
        </div>
    )
}

Card.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    poster: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.array,
}

export default Card

import { Link } from 'react-router-dom';

const ActorCard = (props) => {
    const { name, image, id } = props;

    return (
        <div className="relative w-[140px] h-[195px] mt-10" key={id}>
            <Link to={`/actors/${id}`}>
                <img className="w-[120px] h-[175px] rounded-2xl before:bg-cover" src={image} alt={id} />
                <p className="absolute left-25 text-base text-gray-600">{name}</p>
            </Link>
        </div>
    );
};

export default ActorCard;

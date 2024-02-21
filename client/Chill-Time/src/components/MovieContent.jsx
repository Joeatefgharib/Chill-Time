import { Link } from "react-router-dom";

const MovieContent = ({ id, title, year, length, genre, description }) => {
  return (
    <div className=" relative opacity-[1] scale-[1] z-50">
      <h2 className=" text-white text-4xl mb-[20px] m-w-[250px]">{title}</h2>
      <h4 className=" font-normal text-3xl text-gray-500">
        <span className=" pr-[10px] pl-[10px]">{genre}</span>
        <span className="pr-[10px] pl-[10px]  border-r-2 border-solid border-gray-500">{year}</span>
      </h4>
      <p className=" text-white text-[1em] leading-tight font-normal mt-[20px] mb-[30px]">{description}</p>
      <div className=" fixed  right-[-14px] cursor-pointer">
        <Link to={`/movie/${id}`}>
        <button className=" bg-red-600 text-white rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-white hover:text-red-600" onClick={() => console.log('Button clicked')}>شاهد الأن</button>
        </Link>
      </div>
    </div>
  );
};

export default MovieContent;

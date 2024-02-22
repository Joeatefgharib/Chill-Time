import MovieContent from "./MovieContent.jsx";

const Banner = ({ id, trendpic, title, year, length, genre, description }) => {
  return (
    <div className=" relative  w-full min-h-[100vh] mr-[0] ml-[100px] overflow-hidden duration-[0.5s] after:absolute after:content-none after:top-0 after:right-0 after:bottom-0 after:left-0 after:w-full after:h-full">
      <div className=" pr-[100px] pl-[100px] absolute top-0 left-0 w-full h-[100vh] flex justify-between items-center overflow-hidden pb-[100px]">
        <img src={trendpic} alt={id} className=" absolute bg-fixed top-0 left-0 w-full h-full object-center text-[8rem] -z-50 brightness-[0.15]" />
        <div className="container-fluid">
          <div className="row">
            <div className=" col-lg-6 col-md-12">
              <MovieContent
                title={title}
                year={year}
                length={length}
                genre={genre[0]}
                description={description}
                id={id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;

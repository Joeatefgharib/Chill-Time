import {useNavigate, useParams} from "react-router-dom";
const Episode = ({episodeNumber, title, description}) => {


    const navigate = useNavigate()
    const handleWatch = () => {
        const currentPath = window.location.pathname;
        const basePath = currentPath.substring(0, currentPath.lastIndexOf('/episodes'));
        navigate(`${basePath}/:${episodeNumber}/watch`)
    }

    return(
      <>

          <div className={' lg:flex lg:items-center gap-[50px] pb-[40px]'}>
              <img onClick={handleWatch} className={' lg:w-[320px] lg:h-[190px] rounded-2xl cursor-pointer'} id={'img'} alt={'ep1'} src={'https://img.akw.onl/thumb/320x190/uploads/MjSvL.jpg'}/>
              <div>
                  <h2 onClick={handleWatch} className={' text-white text-2xl cursor-pointer'}>{title}</h2>
                  <p className=" text-gray-600 w-10/12">{description}</p>
              </div>
          </div>
      </>
  )
}

export default Episode
import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieDownloadbtn = () => {

    const navigateRoute = useNavigate()


  return (
    <button className={" w-[100px] bg-white text-red-600 rounded-2xl pt-1 pb-1 pr-4 pl-4 hover:duration-[0.4s] hover:bg-red-600 hover:text-white"} onClick={() => navigateRoute(`download`)} >حمل الأن</button>
  )
}

export default MovieDownloadbtn
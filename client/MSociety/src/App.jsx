import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import Movies from "./pages/Movies.jsx";
import Series from "./pages/Series.jsx";
import MoviePage from "./pages/MoviePage.jsx";
import SeriesPage from "./pages/SeriesPage.jsx";
import EpsMenu from "./pages/EpsMenu.jsx";
import WatchMoviePage from './pages/WatchMoviePage.jsx'
import WatchSeriesPage from './pages/WatchSeriesPage.jsx'
import ActorPage from './pages/ActorPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import TurkishSeries from './pages/TurkishSeries.jsx';
import ArabicSeries from './pages/ArabicSeries.jsx'
import EnglishSeries from './pages/EnglishSeries.jsx';
import TurkishMovies from './pages/TurkishMovies.jsx';
import ArabicMovies from './pages/ArabicMovies.jsx';
import EnglishMovies from './pages/EnglishMovies.jsx';

function App() {

  return (
    <>
      <Routes>
          <Route path={'/'} element={<Home/>}/>
          <Route path={'movies'} element={<Movies />} />
          <Route path={'series'} element={<Series />} />
          <Route path={'movie/:id'} element={<MoviePage />} />
          <Route path={'movie/:id/watch/:type'} element={<WatchMoviePage />} />
          <Route path={'movies/عربي'} element={<ArabicMovies />} />
          <Route path={'movies/اجنبي'} element={<EnglishMovies />} />
          <Route path={'movies/تركي'} element={<TurkishMovies />} />
          <Route path={'series/:id'} element={<SeriesPage />}/>
          <Route path={'series/:id/:seasonNumber/episodes'} element={<EpsMenu />} />
          <Route path={'series/:id/:seasonNumber/:ep/watch/:type'} element={<WatchSeriesPage />} />
          <Route path={'series/trending'} element={<Series />}/>
          <Route path={'series/عربي'} element={<ArabicSeries />}/>
          <Route path={'series/اجنبي'} element={<EnglishSeries />}/>
          <Route path={'series/تركي'} element={<TurkishSeries />}/>
          <Route path={'actors/:id'} element={<ActorPage />} />
          <Route path={'search/:id'} element={<SearchPage />} />
      </Routes>
    </>
  )
}

export default App

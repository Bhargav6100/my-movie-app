import "./App.css";
import { MovieContext } from "../Context/MovieContext";
import { FavouriteContext } from "../Context/FavouriteContext";
import { WatchlistContext } from "../Context/WatchListContext";
import { useContext } from "react";
import Movie from "./Movie";
import Pagination from "./Pagination";
import Header from "./Header";
import Favourites from "./Favourites";
import Watchlist from "./WatchList";
import MovieModal from "./MovieModal";
import Footer from "./Footer";

function App() {
  const { isLoading, isError, displayedMovies } = useContext(MovieContext);
  const { displayFavMovies, favoriteMovies } = useContext(FavouriteContext);
  const { displayWatchlistMovies, watchlistMovies } = useContext(WatchlistContext);

  return (
    <div>
      <Header />

      {isLoading && <p>Loading...</p>}
      {isError && (
        <p>Something went wrong: {String(isError.message || isError)}</p>
      )}

      <div className="moviesGrid">
        {!displayFavMovies && !displayWatchlistMovies &&
          displayedMovies.map((d) => (
           <Movie
          key={d.id}
          id={d.id}
          title={d.title}
          image={d.poster_path}
          overview={d.overview}
          releaseDate={d.release_date}
          rating={d.vote_average}
          language={d.original_language}
          isFavorite={favoriteMovies.some((movie) => movie.id === d.id)}
          isInWatchlist={watchlistMovies.some((movie) => movie.id === d.id)}/>
          ))}
      </div>

      <div className="moviesGrid">
        {displayFavMovies && <Favourites />}
        {displayWatchlistMovies && <Watchlist />}
      </div>

      {!displayFavMovies && !displayWatchlistMovies && <Pagination />}

      <MovieModal />
      <Footer/>
    </div>
  );
}

export default App;
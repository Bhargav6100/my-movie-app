import { useContext } from "react";
import Movie from "./Movie";
import { WatchlistContext } from "../Context/WatchListContext";
import { FavouriteContext } from "../Context/FavouriteContext";

export default function Watchlist() {
  const { watchlistMovies } = useContext(WatchlistContext);
  const { favoriteMovies } = useContext(FavouriteContext);

  if (watchlistMovies.length === 0) {
    return <p>No movies in watchlist yet.</p>;
  }

  return (
    <>
      {watchlistMovies.map((d) => (
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
          isInWatchlist={true}
        />
      ))}
    </>
  );
}

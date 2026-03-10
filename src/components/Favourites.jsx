import Movie from "./Movie";
import { FavouriteContext } from "../Context/FavouriteContext";
import { useContext } from "react";

export default function Favourites() {
  const { favoriteMovies } = useContext(FavouriteContext);

  if (favoriteMovies.length === 0) {
    return <p>No favorite movies added yet.</p>;
  }

  return (
    <>
      {favoriteMovies.map((d) => (
        <Movie
          key={d.id}
          id={d.id}
          title={d.title}
          image={d.poster_path}
          overview={d.overview}
          releaseDate={d.release_date}
          rating={d.vote_average}
          language={d.original_language}
          isFavorite={true}
        />
      ))}
    </>
  );
}
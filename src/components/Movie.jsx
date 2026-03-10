import styles from "./Movie.module.css";
import { FavouriteContext } from "../Context/FavouriteContext";
import { MovieContext } from "../Context/MovieContext";
import { useContext } from "react";

export default function Movie({
 id,
  title,
  image,
  overview,
  releaseDate,
  rating,
  language,
  isFavorite,
}) {
  const { addToFavorite, removeFromFavs, displayFavMovies } =
    useContext(FavouriteContext);

  const { openMovieDetails } = useContext(MovieContext);

  const movieData = {
    id,
  title,
  poster_path: image,
  overview,
  release_date: releaseDate,
  vote_average: rating,
  original_language: language,
  };

  return (
    <div
      className={styles.movieCard}
      onClick={() => openMovieDetails(movieData)}
    >
      <div className={styles.posterWrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500${image}`}
          alt={title}
        />
        {!displayFavMovies && <div className={styles.overview}>{overview}</div>}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.releaseDate}>{releaseDate}</p>

        {!displayFavMovies && (
          <>
            {!isFavorite && (
              <button
                className={styles.favBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  addToFavorite(movieData);
                }}
              >
                Add to Favs
              </button>
            )}

            {isFavorite && <span className={styles.addedBadge}>♥ Added</span>}
          </>
        )}

        {displayFavMovies && (
          <button
            className={styles.removeBtn}
            onClick={(e) => {
              e.stopPropagation();
              removeFromFavs(id);
            }}
          >
            Remove from Favs
          </button>
        )}
      </div>
    </div>
  );
}

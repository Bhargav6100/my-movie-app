import { useContext } from "react";
import { MovieContext } from "../Context/MovieContext";
import useMovieDetails from "../hooks/useMovieDetails";
import styles from "./MovieModal.module.css";

export default function MovieModal() {
  const { selectedMovie, closeMovieDetails } = useContext(MovieContext);

  const movieId = selectedMovie?.id;
  const { movieDetails, detailsLoading, detailsError } = useMovieDetails(movieId);

  if (!selectedMovie) return null;

  const title = movieDetails?.title || selectedMovie.title;
  const posterPath = movieDetails?.poster_path || selectedMovie.poster_path;
  const backdropPath = movieDetails?.backdrop_path;
  const overview = movieDetails?.overview || selectedMovie.overview;
  const releaseDate = movieDetails?.release_date || selectedMovie.release_date;
  const rating = movieDetails?.vote_average;
  const language = movieDetails?.original_language;
  const runtime = movieDetails?.runtime;
  const tagline = movieDetails?.tagline;
  const genres = movieDetails?.genres || [];

  return (
    <div className={styles.backdrop} onClick={closeMovieDetails}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={closeMovieDetails}>
          ✕
        </button>

        {backdropPath && (
          <div
            className={styles.banner}
            style={{
              backgroundImage: `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.35)), url(https://image.tmdb.org/t/p/original${backdropPath})`,
            }}
          />
        )}

        <div className={styles.content}>
          {posterPath && (
            <img
              className={styles.poster}
              src={`https://image.tmdb.org/t/p/w500${posterPath}`}
              alt={title}
            />
          )}

          <div className={styles.details}>
            <h2 className={styles.title}>{title}</h2>

            {tagline && <p className={styles.tagline}>{tagline}</p>}

            {detailsLoading && <p className={styles.meta}>Loading details...</p>}
            {detailsError && (
              <p className={styles.meta}>
                Could not load extra details: {String(detailsError.message || detailsError)}
              </p>
            )}

            <p className={styles.meta}>
              <strong>Release Date:</strong> {releaseDate || "N/A"}
            </p>

            <p className={styles.meta}>
              <strong>Rating:</strong> {rating ? rating.toFixed(1) : "N/A"}
            </p>

            <p className={styles.meta}>
              <strong>Language:</strong> {language ? language.toUpperCase() : "N/A"}
            </p>

            <p className={styles.meta}>
              <strong>Runtime:</strong> {runtime ? `${runtime} min` : "N/A"}
            </p>

            {genres.length > 0 && (
              <div className={styles.genreRow}>
                {genres.map((genre) => (
                  <span key={genre.id} className={styles.genreBadge}>
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <p className={styles.overview}>
              {overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
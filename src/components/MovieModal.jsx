import { useContext, useMemo } from "react";
import { MovieContext } from "../Context/MovieContext";
import useMovieDetails from "../hooks/useMovieDetails";
import useMovieVideos from "../hooks/useMovieVideos";
import useMovieCredits from "../hooks/useMovieCredits";
import useSimilarMovies from "../hooks/useSimilarMovies";
import styles from "./MovieModal.module.css";

export default function MovieModal() {
  const { selectedMovie, closeMovieDetails, openMovieDetails } =
    useContext(MovieContext);

  const movieId = selectedMovie?.id;

  const { movieDetails, detailsLoading, detailsError } = useMovieDetails(movieId);
  const { videos, videosLoading, videosError } = useMovieVideos(movieId);
  const { credits, creditsLoading, creditsError } = useMovieCredits(movieId);
  const { similarMovies, similarLoading, similarError } = useSimilarMovies(movieId);

  const trailer = useMemo(() => {
    if (!videos.length) return null;

    return (
      videos.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official
      ) ||
      videos.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      ) ||
      videos.find((video) => video.site === "YouTube")
    );
  }, [videos]);

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
  const topCast = credits?.cast?.slice(0, 8) || [];
  const relatedMovies = similarMovies.slice(0, 8);

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

        <div className={styles.trailerSection}>
          <h3 className={styles.sectionTitle}>Trailer</h3>

          {videosLoading && <p className={styles.meta}>Loading trailer...</p>}
          {videosError && (
            <p className={styles.meta}>
              Could not load trailer: {String(videosError.message || videosError)}
            </p>
          )}

          {trailer ? (
            <div className={styles.videoWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${title} trailer`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            !videosLoading && (
              <p className={styles.meta}>No trailer available for this movie.</p>
            )
          )}
        </div>

        <div className={styles.castSection}>
          <h3 className={styles.sectionTitle}>Top Cast</h3>

          {creditsLoading && <p className={styles.meta}>Loading cast...</p>}
          {creditsError && (
            <p className={styles.meta}>
              Could not load cast: {String(creditsError.message || creditsError)}
            </p>
          )}

          {!creditsLoading && topCast.length > 0 && (
            <div className={styles.castGrid}>
              {topCast.map((person) => (
                <div key={person.cast_id || person.credit_id || person.id} className={styles.castCard}>
                  {person.profile_path ? (
                    <img
                      className={styles.castImage}
                      src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                      alt={person.name}
                    />
                  ) : (
                    <div className={styles.castPlaceholder}>No Image</div>
                  )}
                  <p className={styles.castName}>{person.name}</p>
                  <p className={styles.castCharacter}>{person.character}</p>
                </div>
              ))}
            </div>
          )}

          {!creditsLoading && topCast.length === 0 && (
            <p className={styles.meta}>No cast information available.</p>
          )}
        </div>

        <div className={styles.similarSection}>
          <h3 className={styles.sectionTitle}>Similar Movies</h3>

          {similarLoading && <p className={styles.meta}>Loading similar movies...</p>}
          {similarError && (
            <p className={styles.meta}>
              Could not load similar movies: {String(similarError.message || similarError)}
            </p>
          )}

          {!similarLoading && relatedMovies.length > 0 && (
            <div className={styles.similarGrid}>
              {relatedMovies.map((movie) => (
                <button
                  key={movie.id}
                  className={styles.similarCard}
                  onClick={() =>
                    openMovieDetails({
                      id: movie.id,
                      title: movie.title,
                      poster_path: movie.poster_path,
                      overview: movie.overview,
                      release_date: movie.release_date,
                      vote_average: movie.vote_average,
                      original_language: movie.original_language,
                    })
                  }
                >
                  {movie.poster_path ? (
                    <img
                      className={styles.similarPoster}
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                    />
                  ) : (
                    <div className={styles.similarPlaceholder}>No Poster</div>
                  )}
                  <p className={styles.similarTitle}>{movie.title}</p>
                </button>
              ))}
            </div>
          )}

          {!similarLoading && relatedMovies.length === 0 && (
            <p className={styles.meta}>No similar movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
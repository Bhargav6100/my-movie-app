import { useState, useEffect } from "react";

export default function useMovieDetails(movieId) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    if (!movieId) {
      setMovieDetails(null);
      return;
    }

    let cancelled = false;

    const fetchMovieDetails = async () => {
      setDetailsLoading(true);
      setDetailsError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const res = await response.json();

        if (cancelled) return;
        setMovieDetails(res);
      } catch (error) {
        if (!cancelled) {
          setDetailsError(error);
        }
      } finally {
        if (!cancelled) {
          setDetailsLoading(false);
        }
      }
    };

    fetchMovieDetails();

    return () => {
      cancelled = true;
    };
  }, [movieId, token]);

  return { movieDetails, detailsLoading, detailsError };
}
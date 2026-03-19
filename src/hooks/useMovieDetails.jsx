import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/app";

export default function useMovieDetails(movieId) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

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
          `${API_BASE_URL}/api/tmdb/movies/${movieId}`
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
  }, [movieId]);

  return { movieDetails, detailsLoading, detailsError };
}
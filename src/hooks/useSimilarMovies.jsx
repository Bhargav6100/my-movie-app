import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/app";
export default function useSimilarMovies(movieId) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [similarError, setSimilarError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setSimilarMovies([]);
      return;
    }

    let cancelled = false;

    const fetchSimilarMovies = async () => {
      setSimilarLoading(true);
      setSimilarError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/tmdb/movies/${movieId}/similar`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const res = await response.json();

        if (!cancelled) {
          setSimilarMovies(res.results || []);
        }
      } catch (error) {
        if (!cancelled) {
          setSimilarError(error);
        }
      } finally {
        if (!cancelled) {
          setSimilarLoading(false);
        }
      }
    };

    fetchSimilarMovies();

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return { similarMovies, similarLoading, similarError };
}
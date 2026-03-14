import { useState, useEffect } from "react";

export default function useSimilarMovies(movieId) {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [similarError, setSimilarError] = useState(null);

  const token = import.meta.env.VITE_TMDB_TOKEN;

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
          `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
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
  }, [movieId, token]);

  return { similarMovies, similarLoading, similarError };
}
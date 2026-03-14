import { useState, useEffect } from "react";

export default function useMovieCredits(movieId) {
  const [credits, setCredits] = useState(null);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [creditsError, setCreditsError] = useState(null);

  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    if (!movieId) {
      setCredits(null);
      return;
    }

    let cancelled = false;

    const fetchCredits = async () => {
      setCreditsLoading(true);
      setCreditsError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
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
          setCredits(res);
        }
      } catch (error) {
        if (!cancelled) {
          setCreditsError(error);
        }
      } finally {
        if (!cancelled) {
          setCreditsLoading(false);
        }
      }
    };

    fetchCredits();

    return () => {
      cancelled = true;
    };
  }, [movieId, token]);

  return { credits, creditsLoading, creditsError };
}
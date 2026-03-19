import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/app";

export default function useMovieCredits(movieId) {
  const [credits, setCredits] = useState(null);
  const [creditsLoading, setCreditsLoading] = useState(false);
  const [creditsError, setCreditsError] = useState(null);

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
          `${API_BASE_URL}/api/tmdb/movies/${movieId}/credits`
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
  }, [movieId]);

  return { credits, creditsLoading, creditsError };
}
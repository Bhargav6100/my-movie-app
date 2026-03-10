import { useState, useEffect } from "react";

export default function useMovieVideos(movieId) {
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState(null);

  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    if (!movieId) {
      setVideos([]);
      return;
    }

    let cancelled = false;

    const fetchVideos = async () => {
      setVideosLoading(true);
      setVideosError(null);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
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
        setVideos(res.results || []);
      } catch (error) {
        if (!cancelled) {
          setVideosError(error);
        }
      } finally {
        if (!cancelled) {
          setVideosLoading(false);
        }
      }
    };

    fetchVideos();

    return () => {
      cancelled = true;
    };
  }, [movieId, token]);

  return { videos, videosLoading, videosError };
}
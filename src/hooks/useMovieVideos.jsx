import { useState, useEffect } from "react";

export default function useMovieVideos(movieId) {
  const [videos, setVideos] = useState([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState(null);

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
          `http://localhost:5000/api/tmdb/movies/${movieId}/videos`
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
  }, [movieId]);

  return { videos, videosLoading, videosError };
}
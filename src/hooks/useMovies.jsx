import { useState, useEffect } from "react";

export default function useMovies(page, searchQuery = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);

  const token = import.meta.env.VITE_TMDB_TOKEN;

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(null);

      try {
        const trimmedQuery = searchQuery.trim();

        const url = trimmedQuery
          ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              trimmedQuery
            )}&include_adult=false&language=en-US&page=${page}`
          : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const res = await response.json();

        if (cancelled) return;

        setData(res.results || []);
       setTotalPage(Math.min(res.total_pages || 0, 500));
      } catch (error) {
        if (!cancelled) {
          setIsError(error);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [page, searchQuery, token]);

  return { data, isLoading, totalPage, isError };
}
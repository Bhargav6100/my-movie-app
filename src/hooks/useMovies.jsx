import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config/app";
export default function useMovies(page, searchQuery = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  

  useEffect(() => {
    let cancelled = false;

    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(null);

      try {
        const trimmedQuery = searchQuery.trim();

        const url = `${API_BASE_URL}/api/tmdb/movies?page=${page}&searchQuery=${encodeURIComponent(
          trimmedQuery
        )}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const res = await response.json();

        if (cancelled) return;

        setData(res.results || []);
        setTotalPage(res.total_pages || 0);
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
  }, [page, searchQuery]);

  return { data, isLoading, totalPage, isError };
}
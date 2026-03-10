import { createContext, useState, useMemo, useContext, useEffect } from "react";
import useMovies from "../hooks/useMovies";
import { PaginationContext } from "./PaginationContext";

export const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const { page, setPage } = useContext(PaginationContext);

  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data = [], isLoading, totalPage, isError } = useMovies(
    page,
    debouncedSearchQuery
  );

  const moviesByGenre = useMemo(() => {
    const map = {};
    data.forEach((movie) => {
      movie.genre_ids.forEach((id) => {
        map[id] ??= [];
        map[id].push(movie);
      });
    });
    return map;
  }, [data]);

  const displayedMovies =
    selectedGenre === "all"
      ? data
      : moviesByGenre[Number(selectedGenre)] ?? [];

  const chooseGenre = (e) => {
    setSelectedGenre(e.target.value);
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setPage(1);
  };

  const openMovieDetails = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieDetails = () => {
    setSelectedMovie(null);
  };

  const value = useMemo(
    () => ({
      selectedGenre,
      searchQuery,
      data,
      isLoading,
      isError,
      totalPage,
      displayedMovies,
      selectedMovie,
      chooseGenre,
      handleSearchChange,
      clearSearch,
      openMovieDetails,
      closeMovieDetails,
    }),
    [
      selectedGenre,
      searchQuery,
      data,
      isLoading,
      isError,
      totalPage,
      displayedMovies,
      selectedMovie,
    ]
  );

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
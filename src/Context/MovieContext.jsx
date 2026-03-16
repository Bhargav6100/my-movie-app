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
  const [sortOption, setSortOption] = useState("popularity");

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

  const genreFilteredMovies =
    selectedGenre === "all"
      ? data
      : moviesByGenre[Number(selectedGenre)] ?? [];
      
  const displayedMovies = useMemo(() => {
    const movies = [...genreFilteredMovies];

    switch (sortOption) {
      case "rating":
        return movies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));

      case "newest":
        return movies.sort(
          (a, b) =>
            new Date(b.release_date || 0).getTime() -
            new Date(a.release_date || 0).getTime()
        );

      case "oldest":
        return movies.sort(
          (a, b) =>
            new Date(a.release_date || 0).getTime() -
            new Date(b.release_date || 0).getTime()
        );

      case "title-asc":
        return movies.sort((a, b) => (a.title || "").localeCompare(b.title || ""));

      case "title-desc":
        return movies.sort((a, b) => (b.title || "").localeCompare(a.title || ""));

      case "popularity":
      default:
        return movies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
  }, [genreFilteredMovies, sortOption]);

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

   const changeSortOption = (e) => {
    setSortOption(e.target.value);
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
      changeSortOption,
      openMovieDetails,
      closeMovieDetails,
    }),
    [
      selectedGenre,
      searchQuery,
      sortOption,
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
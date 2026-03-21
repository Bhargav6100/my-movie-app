import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { API_BASE_URL } from "../config/app";

export const WatchlistContext = createContext(null);

export const WatchListProvider = ({ children }) => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const [displayWatchlistMovies, setDisplayWatchlistMovies] = useState(false);
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!isLoggedIn || !token) {
        setWatchlistMovies([]);
        setDisplayWatchlistMovies(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/api/users/watchlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch watchlist");
        }

        const data = await res.json();

        const mappedMovies = data.map((movie) => ({
          id: movie.movieId,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          overview: movie.overview,
        }));

        setWatchlistMovies(mappedMovies);
      } catch (error) {
        console.error("Failed to fetch watchlist:", error);
        setWatchlistMovies([]);
      }
    };

    fetchWatchlist();
  }, [isLoggedIn, token]);

  const addToWatchlist = async (movie) => {
    if (!movie || !isLoggedIn || !token) return false;

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/watchlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movieId: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          vote_average: movie.vote_average,
          release_date: movie.release_date,
          overview: movie.overview,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add watchlist movie");
      }

      const data = await res.json();

      const mappedMovies = data.map((item) => ({
        id: item.movieId,
        title: item.title,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        vote_average: item.vote_average,
        release_date: item.release_date,
        overview: item.overview,
      }));

      setWatchlistMovies(mappedMovies);
      return true;
    } catch (error) {
      console.error("Failed to add watchlist movie:", error);
      return false;
    }
  };

  const removeFromWatchlist = async (id) => {
    if (!isLoggedIn || !token) return false;

    try {
      const res = await fetch(`${API_BASE_URL}/api/users/watchlist/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to remove watchlist movie");
      }

      const data = await res.json();

      const mappedMovies = data.map((item) => ({
        id: item.movieId,
        title: item.title,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        vote_average: item.vote_average,
        release_date: item.release_date,
        overview: item.overview,
      }));

      setWatchlistMovies(mappedMovies);
      return true;
    } catch (error) {
      console.error("Failed to remove watchlist movie:", error);
      return false;
    }
  };

  const displayWatchlist = () => setDisplayWatchlistMovies(true);
  const hideWatchlist = () => setDisplayWatchlistMovies(false);

  const value = useMemo(
    () => ({
      displayWatchlistMovies,
      watchlistMovies,
      addToWatchlist,
      removeFromWatchlist,
      displayWatchlist,
      hideWatchlist,
    }),
    [displayWatchlistMovies, watchlistMovies]
  );

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
};
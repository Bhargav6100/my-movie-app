import { createContext, useState,useContext,useMemo, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export const WatchlistContext = createContext(null);

const API_BASE_URL = "https://my-movie-app-imu7.onrender.com";

export const WatchListProvider = ({ children }) => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const [displayWatchlistMovies, setDisplayWatchlistMovies] = useState(false);

  const [watchlistMovies, setWatchlistMovies] = useState(() => {
    try {
      const storedList = localStorage.getItem("watchlistMovies");
      return storedList ? JSON.parse(storedList) : [];
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    if (!isLoggedIn) {
      try {
        localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies));
      } catch (error) {
        console.error("Failed to save watchlist:", error);
      }
    }
  }, [watchlistMovies, isLoggedIn]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!isLoggedIn || !token) return;

      try {
        const res = await fetch(`${API_BASE_URL}/users/watchlist`, {
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
      }
    };

    fetchWatchlist();
  }, [isLoggedIn, token]);

  const addToWatchlist = async (movie) => {
    if (!movie) return;

    if (!isLoggedIn || !token) {
      setWatchlistMovies((prev) => {
        if (prev.some((m) => m.id === movie.id)) return prev;
        return [...prev, movie];
      });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/watchlist`, {
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
    } catch (error) {
      console.error("Failed to add watchlist movie:", error);
    }
  };

  const removeFromWatchlist = async (id) => {
    if (!isLoggedIn || !token) {
      setWatchlistMovies((prev) => prev.filter((movie) => movie.id !== id));
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/watchlist/${id}`, {
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
    } catch (error) {
      console.error("Failed to remove watchlist movie:", error);
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
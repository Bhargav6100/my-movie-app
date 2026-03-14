import { createContext, useState, useMemo, useEffect } from "react";

export const WatchlistContext = createContext(null);

export const WatchListProvider = ({ children }) => {
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
    try {
      localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [watchlistMovies]);

  const addToWatchlist = (movie) => {
    setWatchlistMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromWatchlist = (id) => {
    setWatchlistMovies((prev) => prev.filter((movie) => movie.id !== id));
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
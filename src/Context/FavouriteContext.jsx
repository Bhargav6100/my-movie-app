// import { createContext, useState,useEffect,useMemo } from "react";

// export const FavouriteContext = createContext(null);

// export const FavouriteProvider = ({ children }) => {
//   const [displayFavMovies, setDisplayFavMovies] = useState(false);
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
  
//     useEffect(() => {
//     try {
//       const storedFavorites = localStorage.getItem("favoriteMovies");
//       if (storedFavorites) {
//         setFavoriteMovies(JSON.parse(storedFavorites));
//       }
//     } catch (error) {
//       console.error("Failed to load favorites from localStorage:", error);
//       setFavoriteMovies([]);
//     }
//   }, []);
//   useEffect(() => {
//     try {
//       localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
//     } catch (error) {
//       console.error("Failed to save favorites to localStorage:", error);
//     }
//   }, [favoriteMovies]);

//   const addToFavorite = (movie) => {
//     if (!favoriteMovies.some(m => m.id === movie.id)) {
//       setFavoriteMovies(prev => [...prev, movie]);
//     }
//   };

//   const removeFromFavs = (id) => {
//     setFavoriteMovies(prev =>
//       prev.filter(movie => movie.id !== id)
//     );
//   };
//  const displayFav=()=>{
//  setDisplayFavMovies(true)
//  }
//  const displayAll=()=>{
//  setDisplayFavMovies(false)
//  }
//   const value = useMemo(() => ({
//     displayFavMovies,
//     favoriteMovies,
//     addToFavorite,
//     removeFromFavs,
//     displayFav,
//     displayAll
//   }), [displayFavMovies, favoriteMovies]);

//   return (
//     <FavouriteContext.Provider value={value}>
//       {children}
//     </FavouriteContext.Provider>
//   );
// };
import { createContext, useState, useMemo, useEffect } from "react";

export const FavouriteContext = createContext(null);

export const FavouriteProvider = ({ children }) => {
  const [displayFavMovies, setDisplayFavMovies] = useState(false);

  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    try {
      const storedFavorites = localStorage.getItem("favoriteMovies");
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favoriteMovies]);

  const addToFavorite = (movie) => {
    setFavoriteMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFromFavs = (id) => {
    setFavoriteMovies((prev) => prev.filter((movie) => movie.id !== id));
  };

  const displayFav = () => setDisplayFavMovies(true);
  const displayAll = () => setDisplayFavMovies(false);

  const value = useMemo(
    () => ({
      displayFavMovies,
      favoriteMovies,
      addToFavorite,
      removeFromFavs,
      displayFav,
      displayAll,
    }),
    [displayFavMovies, favoriteMovies]
  );

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
};
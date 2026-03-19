import { createContext, useState,useContext,useMemo, useEffect } from "react";
import { AuthContext } from "./AuthContext";
export const FavouriteContext = createContext(null);

const API_BASE_URL = "https://my-movie-app-imu7.onrender.com";

export const FavouriteProvider = ({ children }) => {
  const { token, isLoggedIn } = useContext(AuthContext);
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
   if(!isLoggedIn){ 
    try {
      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
   }
  }, [favoriteMovies,isLoggedIn]);

  useEffect(()=>{
    const fetchFavorites = async ()=>{
    if(!isLoggedIn || !token) return;
    try{
      const res = await fetch(`${API_BASE_URL}/users/favorites`,{
         headers: {
            Authorization: `Bearer ${token}`,
          },
      })
      if (!res.ok) {
          throw new Error("Failed to fetch favorites");
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
         setFavoriteMovies(mappedMovies); 
      }
      catch(error){
       console.error("Failed to fetch favorites:", error);  
      }
    };
      fetchFavorites();
  },[isLoggedIn,token]);

  const addToFavorite = async (movie) => {
    if(!movie) return;
    if(!isLoggedIn || !token){
    setFavoriteMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };
    try{
      const res = await fetch(`${API_BASE_URL}/users/favorites`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
           Authorization : `Bearer ${token}`,
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
     }) 
      if(!res.ok){
        throw new Error ("Failed to add favorite");
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

      setFavoriteMovies(mappedMovies);
    }
    catch(error){
       console.error("Failed to add favorite:", error);
    }
  }

  const removeFromFavs = async (id) => {
    if (!isLoggedIn || !token) {
      setFavoriteMovies((prev) => prev.filter((movie) => movie.id !== id));
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/users/favorites/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to remove favorite");
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

      setFavoriteMovies(mappedMovies);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
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
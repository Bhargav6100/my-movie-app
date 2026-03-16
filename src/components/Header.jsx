import styles from "./Header.module.css";
import GenreSelector from "./GenreSelector";
import SearchBar from "./SearchBar";
import SortSelector from "./SortSelector";
import { FavouriteContext } from "../Context/FavouriteContext";
import { WatchlistContext } from "../Context/WatchListContext";
import { useContext } from "react";

export default function Header() {
  const { displayFavMovies, displayAll, displayFav } =
    useContext(FavouriteContext);

  const { displayWatchlistMovies, displayWatchlist, hideWatchlist } =
    useContext(WatchlistContext);
    
    const showAllMovies = () => {
    displayAll();
    hideWatchlist();
  };

  const showFavorites = () => {
    displayFav();
    hideWatchlist();
  };

  const showWatchlist = () => {
    displayWatchlist();
    displayAll();
  };
  return (
    <header className={styles.headWrapper}>
      <div className={styles.leftSection}>
        <h2 className={styles.logo}>🎬 CineVault</h2>
        <GenreSelector />
        <SortSelector />
        <SearchBar />
      </div>

        <div className={styles.actions}>
        <button
          className={`${styles.btn} ${displayFavMovies ? styles.active : ""}`}
          onClick={showFavorites}
        >
          ❤️ Fav Movies
        </button>
        <button
          className={`${styles.btn} ${displayWatchlistMovies ? styles.active : ""}`}
          onClick={showWatchlist}
        >
          📌 Watchlist
        </button>
        <button
          className={`${styles.btn} ${
            !displayFavMovies && !displayWatchlistMovies ? styles.active : ""
          }`}
          onClick={showAllMovies}
        >
          All Movies
        </button>
      </div>
    </header>
  );
}
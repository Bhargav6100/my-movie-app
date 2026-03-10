import styles from "./Header.module.css";
import GenreSelector from "./GenreSelector";
import SearchBar from "./SearchBar";
import { FavouriteContext } from "../Context/FavouriteContext";
import { useContext } from "react";

export default function Header() {
  const { displayFavMovies, displayAll, displayFav } =
    useContext(FavouriteContext);

  return (
    <header className={styles.headWrapper}>
      <div className={styles.leftSection}>
        <h2 className={styles.logo}>🎬 CineVault</h2>
        <GenreSelector />
        <SearchBar />
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${displayFavMovies ? styles.active : ""}`}
          onClick={displayFav}
        >
          ❤️ Fav Movies
        </button>

        <button
          className={`${styles.btn} ${!displayFavMovies ? styles.active : ""}`}
          onClick={displayAll}
        >
          All Movies
        </button>
      </div>
    </header>
  );
}
import { useContext } from "react";
import { MovieContext } from "../Context/MovieContext";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const { searchQuery, handleSearchChange, clearSearch } = useContext(MovieContext);

  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />

      {searchQuery && (
        <button className={styles.clearBtn} onClick={clearSearch}>
          ✕
        </button>
      )}
    </div>
  );
}
import styles from "./GenreSelector.module.css";
import GENRE from "../utils/Genres";
import { MovieContext } from "../Context/MovieContext";
import { useContext } from "react";
export default function GenreSelector() {
  const {selectedGenre,chooseGenre}=useContext(MovieContext);
  return (
    <div className={styles.selectWrapper}>
      <select
        className={styles.genreSelect}
        value={selectedGenre}
        onChange={chooseGenre}
      >
        <option value="all">All</option>

        {GENRE.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
}

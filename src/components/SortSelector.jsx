import { useContext } from "react";
import { MovieContext } from "../Context/MovieContext";
import styles from "./SortSelector.module.css";

export default function SortSelector() {
  const { sortOption, changeSortOption } = useContext(MovieContext);

  return (
    <div className={styles.selectWrapper}>
      <select
        className={styles.sortSelect}
        value={sortOption}
        onChange={changeSortOption}
      >
        <option value="popularity">Popularity</option>
        <option value="rating">Rating</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="title-asc">Title A–Z</option>
        <option value="title-desc">Title Z–A</option>
      </select>
    </div>
  );
}
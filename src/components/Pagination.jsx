import { PaginationContext } from "../Context/PaginationContext";
import { MovieContext } from "../Context/MovieContext";
import { useContext } from "react";
import styles from "./Pagination.module.css";

export default function Pagination() {
  const { moveToPrevPage, moveToNextPage, page } =
    useContext(PaginationContext);
  const { totalPage } = useContext(MovieContext);

  return (
    <div className={styles.paginationWrapper}>
      <button
        className={styles.pageBtn}
        onClick={moveToPrevPage}
        disabled={page === 1}
      >
        ← Previous
      </button>

      <span className={styles.pageInfo}>
        Page <strong>{page}</strong> of {totalPage}
      </span>

      <button
        className={styles.pageBtn}
        onClick={moveToNextPage}
        disabled={page === totalPage}
      >
        Next →
      </button>
    </div>
  );
}
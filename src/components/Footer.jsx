import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.text}>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>

        <p className={styles.subtext}>
          Movie data and images provided by{" "}
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            TMDB
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
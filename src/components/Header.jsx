import styles from "./Header.module.css";
import GenreSelector from "./GenreSelector";
import SearchBar from "./SearchBar";
import SortSelector from "./SortSelector";
import AuthModal from "./AuthModal";
import { FavouriteContext } from "../Context/FavouriteContext";
import { WatchlistContext } from "../Context/WatchListContext";
import {AuthContext} from "../Context/AuthContext";
import { useContext, useState } from "react";

export default function Header() {
  const { displayFavMovies, displayAll, displayFav } =
    useContext(FavouriteContext);

  const { displayWatchlistMovies, displayWatchlist, hideWatchlist } =
    useContext(WatchlistContext);

  const { isLoggedIn, userInfo, logout } = useContext(AuthContext);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

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

  const openLoginModal = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const openRegisterModal = () => {
    setAuthMode("register");
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
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
            className={`${styles.btn} ${
              displayWatchlistMovies ? styles.active : ""
            }`}
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

          {!isLoggedIn ? (
            <>
              <button className={styles.authBtn} onClick={openLoginModal}>
                Login
              </button>
              <button className={styles.authBtnSecondary} onClick={openRegisterModal}>
                Register
              </button>
            </>
          ) : (
            <>
              <span className={styles.userText}>Hi, {userInfo?.name}</span>
              <button className={styles.authBtn} onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={closeAuthModal}
          setMode={setAuthMode}
        />
      )}
    </>
  );
}
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
  getWatchlist,
  addWatchlist,
  removeWatchlist,
} = require("../controllers/userMovieController");

const router = express.Router();

router.get("/favorites", protect, getFavorites);
router.post("/favorites", protect, addFavorite);
router.delete("/favorites/:movieId", protect, removeFavorite);

router.get("/watchlist", protect, getWatchlist);
router.post("/watchlist", protect, addWatchlist);
router.delete("/watchlist/:movieId", protect, removeWatchlist);

module.exports = router;
const express = require("express");
const {
  searchMovies,
  getMovieVideos,
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
} = require("../controllers/tmdbController");

const router = express.Router();

router.get("/movies", searchMovies);
router.get("/movies/:movieId", getMovieDetails);
router.get("/movies/:movieId/videos", getMovieVideos);
router.get("/movies/:movieId/credits", getMovieCredits);
router.get("/movies/:movieId/similar", getSimilarMovies);
module.exports = router;
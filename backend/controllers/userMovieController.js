const User = require("../models/User");

// GET favorites
const getFavorites = async (req, res) => {
  try {
    return res.status(200).json(req.user.favorites || []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ADD favorite
const addFavorite = async (req, res) => {
  try {
    const {
      movieId,
      title,
      poster_path,
      backdrop_path,
      vote_average,
      release_date,
      overview,
    } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "movieId is required" });
    }

    const user = await User.findById(req.user._id);

    const alreadyExists = user.favorites.some(
      (movie) => movie.movieId === movieId
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Movie already in favorites" });
    }

    user.favorites.push({
      movieId,
      title,
      poster_path,
      backdrop_path,
      vote_average,
      release_date,
      overview,
    });

    await user.save();

    return res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// REMOVE favorite
const removeFavorite = async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);

    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      (movie) => movie.movieId !== movieId
    );

    await user.save();

    return res.status(200).json(user.favorites);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET watchlist
const getWatchlist = async (req, res) => {
  try {
    return res.status(200).json(req.user.watchlist || []);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ADD watchlist
const addWatchlist = async (req, res) => {
  try {
    const {
      movieId,
      title,
      poster_path,
      backdrop_path,
      vote_average,
      release_date,
      overview,
    } = req.body;

    if (!movieId) {
      return res.status(400).json({ message: "movieId is required" });
    }

    const user = await User.findById(req.user._id);

    const alreadyExists = user.watchlist.some(
      (movie) => movie.movieId === movieId
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    user.watchlist.push({
      movieId,
      title,
      poster_path,
      backdrop_path,
      vote_average,
      release_date,
      overview,
    });

    await user.save();

    return res.status(200).json(user.watchlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// REMOVE watchlist
const removeWatchlist = async (req, res) => {
  try {
    const movieId = Number(req.params.movieId);

    const user = await User.findById(req.user._id);

    user.watchlist = user.watchlist.filter(
      (movie) => movie.movieId !== movieId
    );

    await user.save();

    return res.status(200).json(user.watchlist);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
  getWatchlist,
  addWatchlist,
  removeWatchlist,
};
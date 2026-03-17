const mongoose = require("mongoose");

const savedMovieSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true,
    },
    title: String,
    poster_path: String,
    backdrop_path: String,
    vote_average: Number,
    release_date: String,
    overview: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: [savedMovieSchema],
      default: [],
    },
    watchlist: {
      type: [savedMovieSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
const searchMovies = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const searchQuery = req.query.searchQuery?.trim() || "";

    const url = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchQuery
        )}&include_adult=false&language=en-US&page=${page}`
      : `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      results: data.results || [],
      total_pages: Math.min(data.total_pages || 0, 500),
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getMovieVideos = async (req, res) => {
  try {
    const { movieId } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      results: data.results || [],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const getMovieDetails = async (req, res) => {
  try {
    const { movieId } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMovieCredits = async (req, res) => {
  try {
    const { movieId } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getSimilarMovies = async (req, res) => {
  try {
    const { movieId } = req.params;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`TMDB request failed with status ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json({
      results: data.results || [],
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  searchMovies,
  getMovieVideos,
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
};
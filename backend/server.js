const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userMovieRoutes = require("./routes/userMovieRoutes");
const tmdbRoutes = require("./routes/tmdbRoutes");
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userMovieRoutes);
app.use("/api/tmdb", tmdbRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
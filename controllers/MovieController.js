
const Movie = require('../models/MovieModel');

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await movie.update(req.body);
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    await movie.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
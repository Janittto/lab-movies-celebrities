const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("./../models/Movie.model");

// all your routes here
router.get("/movies/create", async (req, res, next) => {
  const allCelebrities = await Celebrity.find();
  res.render("movies/new-movie", { allCelebrities });
});

router.get("/movies", async (req, res, next) => {
  const allMovies = await Movie.find(); //.populate("celebrities");
  // console.log(allMovies);
  res.render("movies/movies", { allMovies });
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { oneMovie });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const myMovie = await Movie.findById(req.params.id).populate("cast");
    const movieCast = await Celebrity.find();
    res.render("movies/edit-movie", { myMovie, movieCast });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.create({ title, genre, plot, cast });
    //User.findByIdAndUpdate(author, { $push: { posts: dbPost._id } });
    res.redirect("/movies");
  } catch (error) {
    res.render("movies/new-movie");
  }
});

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    console.log(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;

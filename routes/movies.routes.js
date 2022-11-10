const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("./../models/Movie.model");

// all your routes here
router.get("/movies/create", async (req, res, next) => {
  const getCast = await Celebrity.find(); //.populate("celebrities");
  console.log(getCast[0].name);
  res.render("movies/new-movie");
});

router.get("/movies", async (req, res, next) => {
  const allMovies = await Movie.find(); //.populate("celebrities");
  // console.log(allMovies);
  res.render("movies/movies", { allMovies });
});

router.post("/movies/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });
    //User.findByIdAndUpdate(author, { $push: { posts: dbPost._id } });
    res.redirect("movies/movies");
  } catch (error) {
    res.render("movies/new-movie");
  }
});

module.exports = router;

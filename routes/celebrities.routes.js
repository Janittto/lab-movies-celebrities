const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model");

// all your routes here

router.get("/celebrities", async (req, res, next) => {
  const allCelebrities = await Celebrity.find();
  res.render("celebrities/celebrities", { allCelebrities });
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity");
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
const data = require("../data.json");
const update = require("../update.json");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", function (req, res, next) {
  res.json(data);
});

router.get("/update", function (req, res, next) {
  res.json(update);
});

module.exports = router;

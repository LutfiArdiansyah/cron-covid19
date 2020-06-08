var express = require("express");
var router = express.Router();
const data = require("../data.json");
const update = require("../update.json");
const prov = require("../prov.json");

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

router.get("/prov", function (req, res, next) {
  res.json(prov);
});

module.exports = router;

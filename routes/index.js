var express = require("express");
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", function (req, res, next) {
  if (fs.existsSync("data.json")) {
    let data = require("../data.json");
    res.json(data);
  } else {
    res.json({});
  }
});

router.get("/update", function (req, res, next) {
  if (fs.existsSync("update.json")) {
    let update = require("../update.json");
    res.json(update);
  } else {
    res.json({});
  }
});

router.get("/prov", function (req, res, next) {
  if (fs.existsSync("prov.json")) {
    let prov = require("../prov.json");
    res.json(prov);
  } else {
    res.json({});
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var fs = require("fs");
var https = require("https");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/data", function (req, res, next) {
  let body = [];
  https.get("https://data.covid19.go.id/public/api/data.json", function (
    response
  ) {
    response.on("data", (val) => {
      body.push(val);
    });
    response.on("end", () =>
      res.json(JSON.parse(Buffer.concat(body).toString()))
    );
  });
});

router.get("/update", function (req, res, next) {
  let body = [];
  https.get("https://data.covid19.go.id/public/api/update.json", function (
    response
  ) {
    response.on("data", (val) => {
      body.push(val);
    });
    response.on("end", () =>
      res.json(JSON.parse(Buffer.concat(body).toString()))
    );
  });
});

router.get("/prov", function (req, res, next) {
  let body = [];
  https.get("https://data.covid19.go.id/public/api/prov.json", function (
    response
  ) {
    response.on("data", (val) => {
      body.push(val);
    });
    response.on("end", () =>
      res.json(JSON.parse(Buffer.concat(body).toString()))
    );
  });
});

module.exports = router;

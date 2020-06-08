var express = require("express");
var router = express.Router();
var schedule = require("node-schedule");
var https = require("https");
var fs = require("fs");

schedule.scheduleJob("*/15 * * * *", function () {
  let data = new fs.createWriteStream("data.json");
  https.get("https://data.covid19.go.id/public/api/data.json", function (
    response
  ) {
    response.pipe(data);
  });

  let update = new fs.createWriteStream("update.json");
  https.get("https://data.covid19.go.id/public/api/update.json", function (
    response
  ) {
    response.pipe(update);
  });

  let prov = new fs.createWriteStream("prov.json");
  https.get("https://data.covid19.go.id/public/api/prov.json", function (
    response
  ) {
    response.pipe(prov);
  });
});
module.exports = router;

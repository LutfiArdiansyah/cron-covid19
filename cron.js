var express = require("express");
var router = express.Router();
var schedule = require("node-schedule");
var https = require("https");
var fs = require("fs");

schedule.scheduleJob("*/15 * * * *", async function () {
  let rmData = await new fs.unlinkSync("data.json");
  let data = await new fs.createWriteStream("data.json");
  https.get("https://data.covid19.go.id/public/api/data.json", function (
    response
  ) {
    response.pipe(data);
  });

  let rmUpdate = await new fs.unlinkSync("update.json");
  let update = await new fs.createWriteStream("update.json");
  https.get("https://data.covid19.go.id/public/api/update.json", function (
    response
  ) {
    response.pipe(update);
  });

  let rmProv = await new fs.unlinkSync("prov.json");
  let prov = await new fs.createWriteStream("prov.json");
  https.get("https://data.covid19.go.id/public/api/prov.json", function (
    response
  ) {
    response.pipe(prov);
  });
});
module.exports = router;

var express = require("express");
var router = express.Router();
var schedule = require("node-schedule");
var https = require("https");
var fs = require("fs");

schedule.scheduleJob("*/60 * * * *", async function () {
  if (fs.existsSync("data.json")) {
    let rmData = await new fs.unlinkSync("data.json");
  }
  let data = await new fs.createWriteStream("data.json");
  https.get("https://data.covid19.go.id/public/api/data.json", function (
    response
  ) {
    response.pipe(data);
  });
  if (fs.existsSync("update.json")) {
    let rmUpdate = await new fs.unlinkSync("update.json");
  }
  let update = await new fs.createWriteStream("update.json");
  https.get("https://data.covid19.go.id/public/api/update.json", function (
    response
  ) {
    response.pipe(update);
  });

  if (fs.existsSync("prov.json")) {
    let rmProv = await new fs.unlinkSync("prov.json");
  }
  let prov = await new fs.createWriteStream("prov.json");
  https.get("https://data.covid19.go.id/public/api/prov.json", function (
    response
  ) {
    response.pipe(prov);
  });
});
module.exports = router;

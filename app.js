var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cron = require("./cron");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

var allRequest = function (req, res, next) {
  let splitUrl = req.url.split("cron-covid19");
  if (splitUrl[1] == "") {
    req.url = splitUrl[0];
  } else {
    let newUrl = "";
    for (let index = 0; index < splitUrl.length; index++) {
      const element = splitUrl[index];
      if (index != 0) {
        newUrl = newUrl + element;
      }
    }
    req.url = newUrl;
  }
  return next();
};

app.use(allRequest);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/cron", cron);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

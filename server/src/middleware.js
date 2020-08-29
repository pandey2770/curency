const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const currency = require("./routes/currency.js");
const app = express();

// TODO: evaluate using hyphen in place of underscore

function loadMiddleWares(app, express) {
  app.use(
    session({
      secret: "ssdn",
      resave: false,
      saveUninitialized: true
    })
  );

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(bodyParser.raw());

  app.get("/api/reFreshCurrency", currency);
  app.post("/api/convertCurrency", currency);
}

module.exports = loadMiddleWares;

var express = require("express");
var app = express();
const loadMiddleWares = require("./src/middleware");
loadMiddleWares(app, express);

app.listen("3001", function() {
  console.log("🌸Bol jaikara bol mere shri guru maharaj ki jai🌸");
});

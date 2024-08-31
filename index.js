// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// log requests in console
app.use("/", function (req, res, next) {
  console.log("+++");
  console.log(req.method + " " + req.path + " - " + req.ip);
  console.log("---");
  next();
});

// handle whoami request
app.get("/api/whoami", function (req, res) {
  console.log("+++");
  const ipaddress = req.ip;
  const language = req.headers["accept-language"];
  const software = req.headers["user-agent"];
  console.log(ipaddress, language, software);
  res.json({ ipaddress: ipaddress, language: language, software: software });
  console.log("---");
});

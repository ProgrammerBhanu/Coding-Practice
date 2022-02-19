
const express = require("express");

const cityController = require("./controllers/city.controller");
const stationController = require("./controllers/station.controller");

const app = express();

app.use(express.json());

app.use("/city", cityController);
app.use("/station", stationController);

module.exports = app;
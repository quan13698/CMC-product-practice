const express = require("express");
const app = express();
const watchesRouter = require("../Routers/WatchesRouter");

app.use(express.json());

app.use('/api', watchesRouter);
module.exports = app;
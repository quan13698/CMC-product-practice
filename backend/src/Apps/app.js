const express = require("express");
const morgan = require('morgan');
const app = express();
const watchesRouter = require("../Routers/WatchesRouter");

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', watchesRouter);
module.exports = app;
const express = require("express");
const morgan = require('morgan');
const app = express();
const productRouter = require("../Routers/productRouter");
const authenRouter = require('../Routers/authenRouter');

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api', productRouter);
app.use('/api', authenRouter);
module.exports = app;
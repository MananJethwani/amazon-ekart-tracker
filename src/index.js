const express = require("express");
const app = express();
const mongoose = require("mongoose");
const url = require('./routes/url');
const email = require('./routes/email');
const cron = require("node-cron");
const { updatePrices } = require("./util/updatedPrices");
require("dotenv").config();

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(express.json());
app.use(allowCrossDomain);
app.use('/url', url);
app.use('/email', email);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`listening on port ${port}`));

    cron.schedule('0 8 * * *', updatePrices);
  })
  .catch((err) => console.error("could not connect to MongoDB...", err));
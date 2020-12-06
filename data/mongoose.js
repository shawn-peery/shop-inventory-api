const express = require("express");
const mongoose = require("mongoose");

const DB_USER_PASS = process.env.DB_USER_PASS;
const ATLAS_CONNECTION = process.env.ATLAS_CONNECTION.replace(
  "<password>",
  DB_USER_PASS
);

exports.connect = () => {
  return mongoose.connect(ATLAS_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

exports.initializeData = () => {
  require("./schemas/users.schema");
  require("./schemas/products.schema");
};

const express = require("express");
const mongoose = require("mongoose");
const { locals } = require("../app");

const DB_USER_PASS = process.env.DB_USER_PASS;
const ATLAS_CONNECTION = process.env.ATLAS_CONNECTION.replace(
  "<password>",
  DB_USER_PASS
);

exports.connect = () => {
  return mongoose.connect(ATLAS_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

exports.initializeData = () => {
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
    quantity: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, required: true, default: true },
  });
  mongoose.model("Product", productSchema);
};

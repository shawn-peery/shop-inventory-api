const mongoose = require("mongoose");
const Product = mongoose.model("Product");

// Create

exports.create = (req, res) => {
  Product.create(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

// Read All

exports.readAll = (req, res) => {
  Product.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log("readAll");
      res.status(400).json(err);
    });
};

// Read One

exports.readOne = (req, res) => {
  Product.find({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((err) => {
      console.log("readOne");
      res.status(400).json(err);
    });
};

// Update

exports.update = (req, res) => {
  Product.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(200).send("Success!");
    })
    .catch((err) => {
      console.log("update");
      res.status(400).json(err);
    });
};

// Delete

exports.delete = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).send("Success!");
    })
    .catch((err) => {
      console.log("delete");
      res.status(400).json(err);
    });
};

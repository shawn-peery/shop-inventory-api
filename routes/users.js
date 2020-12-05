var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();

const JWT_KEY = process.env.JWT_KEY;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;

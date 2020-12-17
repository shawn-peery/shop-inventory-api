var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();

const JWT_KEY = process.env.JWT_KEY;

const User = require("../../data/schemas/users.schema");

/* GET users listing. */
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById({ _id: id })
    .select("email")
    .select("username");

  res.status(200).json(user);
});

module.exports = router;

var express = require("express");
const jwt = require("jsonwebtoken");
var router = express.Router();

const JWT_KEY = process.env.JWT_KEY;

const User = require("../../data/schemas/users.schema");

/* GET users listing. */
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  var decoded = jwt.decode(res.locals.token);

  const user = await User.findById({ _id: decoded._id });

  console.log("decoded._id !== id");
  console.log(decoded._id !== id);

  console.log("user.role === admin");
  console.log(user.role === "admin");

  console.log("user");
  console.log(user);

  if (decoded._id !== id && user.role !== "admin") {
    res
      .status(400)
      .json({ message: "You do not have access to this profile!" });
    return;
  }
  const userObj = await User.findById({ _id: id })
    .select("email")
    .select("username");

  res.status(200).json(userObj);
});

module.exports = router;

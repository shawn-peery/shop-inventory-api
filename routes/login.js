const express = require("express");
const router = express.Router();

const User = require("../data/schemas/users.schema");

router.post("/login", async function (req, res) {
  const body = req.body;
});

module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../../controllers/users/register");

router.post("/", controller.register);

module.exports = router;

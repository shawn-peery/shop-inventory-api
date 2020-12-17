const express = require("express");
const router = express.Router();

const profileController = require("../../controllers/users/profile");

router.get("/", profileController.profile);

module.exports = router;

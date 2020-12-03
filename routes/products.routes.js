const express = require("express");
const router = express.Router();
const controller = require("../controllers/products.controller");

//CREATE

router.post("/", controller.create);

// READ ALL

router.get("/", controller.readAll);

// READ ONE

router.get("/:id", controller.readOne);

// UPDATE

router.put("/:id", controller.update);

// DELETE

router.delete("/:id", controller.delete);

module.exports = router;

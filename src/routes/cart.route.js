const express = require("express");
const cartController = require("../controllers/cart.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add", authUser, cartController.addToCart);

module.exports = router;

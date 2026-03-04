const express = require("express");
const wishlistController = require("../controllers/wishlist.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/add", authUser, wishlistController.addToWishlist);
router.get("/", authUser, wishlistController.getWishlist);

module.exports = router;

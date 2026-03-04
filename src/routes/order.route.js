const express = require("express");
const orderController = require("../controllers/order.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", authUser, orderController.createOrder);
router.get("/", authUser, orderController.getUserOrders);

module.exports = router;

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            }
        }
    ],
    totalAmount: {
        type: Number,
        default: 0,
        required: true
    }
})

const cartModel = mongoose.model("Cart", cartSchema)

module.exports = cartModel

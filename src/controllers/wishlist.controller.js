const wishlistModel = require("../models/wishlist.model");
const validationService = require("../services/validation.service");

async function addToWishlist(req, res) {
    try {
        const validation = validationService.validateRequiredFields(["product"], req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const { product } = req.body;
        const userId = req.user.id;

        let wishlist = await wishlistModel.findOne({ user: userId });

        if (!wishlist) {
            wishlist = await wishlistModel.create({
                user: userId,
                products: [{ product }]
            });
        } else {
            const productExists = wishlist.products.some(p => p.product.toString() === product);
            if (productExists) {
                return res.status(400).json({ message: "Product already in wishlist" });
            }
            wishlist.products.push({ product });
            await wishlist.save();
        }

        res.status(201).json({
            message: "Product added to wishlist successfully",
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding product to wishlist",
            error: error.message
        });
    }
}

async function getWishlist(req, res) {
    try {
        const userId = req.user.id;
        const wishlist = await wishlistModel.findOne({ user: userId }).populate("products.product");

        if (!wishlist) {
            return res.status(200).json({ message: "Wishlist is empty", products: [] });
        }

        res.status(200).json({
            message: "Wishlist fetched successfully",
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching wishlist",
            error: error.message
        });
    }
}

module.exports = { addToWishlist, getWishlist };

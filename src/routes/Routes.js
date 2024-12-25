const express = require("express");
const path = require("path");
const passport = require("passport");
const productController = require("../controllers/productController");
const router = express.Router();

router.get("/api/products", productController.getAllProducts);
router.post("/api/products", productController.addProduct);
router.get("/api/products/:id", productController.getProductById);
router.delete("/api/products/:id", productController.deleteProductById);

// Google Login Route

// Route for the homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get('/edit-profile', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/edit-profile.html"));
});
router.get('/change-username', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/change-username.html"));
});
router.get('/password', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/password.html"));
});


module.exports = router;

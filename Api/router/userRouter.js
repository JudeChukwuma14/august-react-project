const express = require('express');
const { signUp, login, signupSeller, loginSeller } = require('../controller/userController');
const { authenticate, restrictToSeller } = require('../middleware/auth');
const upload = require('../middleware/multer');
const { postProduct, getAllProduct, getTrendingThisWeek, getWhatsHotThisWeek, getFeaturedCollections, getShopByCategory, getSpecialOffers, getStyleInspiration, getSellerProducts, updateProduct, deleteProduct } = require('../controller/productController');
const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/seller-signup", signupSeller)
router.post("/seller-login", loginSeller)

// product route
router.post("/product-upload", authenticate, restrictToSeller, upload, postProduct)
router.get('/all', getAllProduct);
router.get('/trending', getTrendingThisWeek);
router.get('/hot', getWhatsHotThisWeek);
router.get('/featured', getFeaturedCollections);
router.get('/shop-by-category', getShopByCategory);
router.get('/special-offers', authenticate, getSpecialOffers);
router.get('/style-inspiration', getStyleInspiration);
router.get("/seller",authenticate,restrictToSeller, getSellerProducts)
router.patch('/:id', authenticate,restrictToSeller, updateProduct);
router.delete('/:id', authenticate,restrictToSeller, deleteProduct)

module.exports = router;
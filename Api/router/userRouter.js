const express = require('express');
const { signUp, login, signupSeller, loginSeller } = require('../controller/userController');
const { authenticate, restrictToSeller, requireUserOrGuestWithSession, requireAuth } = require('../middleware/auth');
const { postProduct, getAllProduct, getTrendingThisWeek, getWhatsHotThisWeek, getFeaturedCollections, getShopByCategory, getSpecialOffers, getStyleInspiration, getSellerProducts, updateProduct, deleteProduct, getProductById } = require('../controller/productController');
const upload = require('../middleware/multer');
const { addToCart, updateCart, deleteCartItem, getCart, syncCart } = require('../controller/cartController');
const { createOrderAndInitializePayment, verifyPaymentWebhook, confirmOrderDelivery, verifyPaymentManual } = require('../controller/orderController');
const router = express.Router();





router.post("/signup", signUp)
router.post("/login", login)
router.post("/seller-signup", signupSeller)
router.post("/seller-login", loginSeller)

// product route
router.post("/product-upload", authenticate, restrictToSeller, upload, postProduct);
router.get('/all', getAllProduct);
router.get('/trending', getTrendingThisWeek);
router.get('/hot', getWhatsHotThisWeek);
router.get('/featured', getFeaturedCollections);
router.get('/shop-by-category', getShopByCategory);
router.get('/special-offers', authenticate, getSpecialOffers);
router.get('/style-inspiration', getStyleInspiration);
router.get("/seller", authenticate, restrictToSeller, getSellerProducts)
router.patch('/:id', authenticate, restrictToSeller, updateProduct);
router.delete('/:id', authenticate, restrictToSeller, deleteProduct)
router.get('/:id', getProductById)




router.post('/add', addToCart);
router.put('/update', updateCart);
router.delete('/remove/:productId', deleteCartItem);
router.get('/cart', getCart);
router.post('/sync', syncCart);



// Guest users AND authenticated users can create orders
router.post('/create-order', authenticate, requireUserOrGuestWithSession, createOrderAndInitializePayment);

// Webhook doesn't need authentication (handled by signature verification)
router.post('/webhook/paystack', verifyPaymentWebhook);

// Manual verification (for frontend callbacks)
router.get('/verify-payment-handler', verifyPaymentManual);

// Only authenticated users can confirm delivery (both users and sellers)
router.post('/:orderId/confirm-delivery', authenticate, requireAuth, confirmOrderDelivery);





module.exports = router;

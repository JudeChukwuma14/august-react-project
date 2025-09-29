const express = require('express');
const { getSellerStats, getSellerOrders, getSellerOrderDetails, getTopSellingProducts, updateSellerProfile, setupSellerPayment, getBanks, verifyBankAccount } = require('../controller/sellerController');
const { authenticate, restrictToSeller } = require('../middleware/auth');

const router = express.Router();

// All seller routes require authentication and seller role
router.use(authenticate);
router.use(restrictToSeller);

// Dashboard stats
router.get('/stats', getSellerStats);

// Orders management
router.get('/orders', getSellerOrders);

// Products analytics
router.get('/products/top-selling', getTopSellingProducts);

// Profile management
router.put('/profile', updateSellerProfile);

router.get('/orders/:orderId', getSellerOrderDetails);

router.post('/payment/setup', setupSellerPayment);

router.get('/banks', getBanks)
router.post('/verify-account', verifyBankAccount);


module.exports = router;
const express = require('express');
const { signUp, login, signupSeller, loginSeller, postProduct } = require('../controller/userController');
const { authenticate, restrictToSeller } = require('../middleware/auth');
const upload = require('../middleware/multer');
const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/seller-signup", signupSeller)
router.post("/seller-login", loginSeller)
router.post("/product-upload", authenticate, restrictToSeller, upload, postProduct)

module.exports = router;
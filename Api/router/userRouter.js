const express = require('express');
const { signUp, login, signupSeller, loginSeller } = require('../controller/userController');
const router = express.Router();

router.post("/signup", signUp)
router.post("/login", login)
router.post("/seller-signup", signupSeller)
router.post("/seller-login", loginSeller)

module.exports = router;
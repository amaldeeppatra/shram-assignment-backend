const express = require('express');
const { handleLogin } = require('../controllers/auth/login');
const { handleSignup } = require('../controllers/auth/signup');
const router = express.Router();


router.post('/login', handleLogin);

router.post("/signup", handleSignup);

module.exports = router;
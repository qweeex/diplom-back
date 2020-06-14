const express = require('express');
const controller = require('../controller/Auth');
const router = express.Router();

// /api/auth/login
router.post('/login', controller.login);

// /api/auth/register
router.post('/register', controller.register);

module.exports = router;

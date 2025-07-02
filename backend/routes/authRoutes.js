const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/authController');
const { getMe } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout);


module.exports = router;


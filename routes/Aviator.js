const express = require('express');
const { registerUserFromExternal } = require('../controllers/userController');
const router = express.Router();

// Route for external user registration
router.post('/register-external', registerUserFromExternal);

module.exports = router;

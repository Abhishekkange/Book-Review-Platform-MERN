const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth-controller');

//Router to handle User Registration
router.post('/register',controller.registerUser);

//Route to handle User Login
router.post('/login', controller.loginUser);

//Route to handle JWT Verification
router.get('/verifyJwtToken/:token', controller.verifyJwtToken);

module.exports = router;
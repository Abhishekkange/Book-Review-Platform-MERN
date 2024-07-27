
const express = require('express');
const router = express.Router();
const controller = require("../controllers/profile-controller");

router.get('/userProfile/:userId', controller.getUserProfile);

//find reviews using userId
router.get('/reviews/:userId',controller.getReveiwOfUser);

// Route to update user details (username and email)
router.put('/updateProfile/:userId', controller.updateUserDetails);


module.exports = router;
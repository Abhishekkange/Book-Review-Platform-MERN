
const book = require('../models/bookModel');
const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');


router.get('/userProfile/:userId', async(req, res) => {

    const userId = req.params.userId;
    const user = await User.findOne({ _id: userId},'email username');
    if(user)
    {
        res.json({"message":user});
    }
    else{

        res.json({"message":"user not found"});
    }
});

//find reviews using userId
router.get('/reviews/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find all books and filter reviews by user ID
        const books = await book.find({ 'reviews.user': userId }).populate('reviews.user', 'username email');

        // Extract reviews made by the specific user
        const userReviews = [];
        books.forEach(book => {
            const reviewsByUser = book.reviews.filter(review => review.user.toString() === userId);
            reviewsByUser.forEach(review => {
                userReviews.push({
                    bookTitle: book.title,
                    bookAuthor: book.author,
                    reviewText: review.reviewText,
                    rating: review.rating,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt
                });
            });
        });

        res.status(200).json(userReviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user reviews', error });
        console.error(error);
    }
});

// Route to update user details (username and email)
router.put('/updateProfile/:userId', async (req, res) => {
    const userId = req.params.userId; // Extract user ID from request parameters
    const { username, email } = req.body; // Extract username and email from request body

    try {
        // Find user by ID and update username and email
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username, email }, // Update only username and email
            { new: true, runValidators: true } // Return the updated document and validate
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User details updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user details', error });
    }
});



module.exports = router;
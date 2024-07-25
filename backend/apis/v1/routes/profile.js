const user = require('../models/UserModel');
const book = require('../models/bookModel');
const express = require('express');
const router = express.Router();


router.get('/userProfile/:userId', async(req, res) => {

    const userId = req.params.userId;
    const user = await user.findOne({ _id: userId});
    if(user)
    {
        res.json({"message":user});
    }
    else{

        res.json({"message":"user not found"});
    }
});

//find reviews using userId
router.get('/reviews/:userId', async(req, res) => {

    try {
        // Find all books and filter reviews by user ID
        const books = await Book.find({ 'reviews.user': userId })
            .populate('reviews.user', 'username email');

        // Extract reviews made by the specific user
        const userReviews = [];
        books.forEach(book => {
            const reviewsByUser = book.reviews.filter(review => review.user._id.toString() === userId);
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
    }

});






module.exports = router;
const express = require('express');
const Book = require('../models/bookModel');
const router = express.Router();

router.post('/addReview', async (req, res) => {
    const { title, author, reviewText, rating, userId } = req.body;

    try {
        let book = await Book.findOne({ title, author });

        if (!book) {
            book = new Book({ title, author });
        }

        book.reviews.push({ user: userId, reviewText, rating });
        await book.save();

        res.status(201).json({ message: 'Review added successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }
});

router.get('/reviews', async (req, res) => {
    try {
        const books = await Book.find().populate('reviews.user', 'username email');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
});

router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({},"title author");
        res.status(200).json({"message":books});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
});

router.put('/editReview/:bookId/:reviewId', async (req, res) => {
    const { bookId, reviewId } = req.params;
    const { reviewText, rating, userId } = req.body;

    try {
        const book = await Book.findById(bookId);
        const review = book.reviews.id(reviewId);

        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only edit your own reviews' });
        }

        review.reviewText = reviewText;
        review.rating = rating;
        review.updatedAt = Date.now();

        await book.save();

        res.status(200).json({ message: 'Review updated successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review', error });
    }
});

router.delete('/deleteReview/:bookId/:reviewId', async (req, res) => {
    const { bookId, reviewId } = req.params;
    const { userId } = req.body;

    try {
        const book = await Book.findById(bookId);
        const review = book.reviews.id(reviewId);

        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own reviews' });
        }

        review.remove();
        await book.save();

        res.status(200).json({ message: 'Review deleted successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review', error });
    }
});

module.exports = router;


module.exports = router;

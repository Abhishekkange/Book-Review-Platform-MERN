const express = require('express');
const router = express.Router();
const Book = require('../models/book-model');
const controller = require('../controllers/bookreview-controller');

//Route to Add a Review to Existing Book
router.post('/addReview', controller.addReview);

//Route to create a new Book and add Review to it
router.post('/createNewBook',controller.createNewBook);

//Route to fetch all the Reviews
router.get('/reviews', async (req, res) => {
    try {
        const books = await Book.find().populate('reviews.user', 'username email');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
});

//Route to fetch all books
router.get('/books', controller.getAllBooks);

//Route to Edit the Review
router.put('/editReview/:bookId/:reviewId',controller.editReview);

//Route to Delete a Review
router.delete('/deleteReview/:bookId/:reviewId', controller.deleteReview);


//find the book by ID
router.get("/book/:bookId",controller.getBookById);

//find review by book ID
router.get("/bookReviews/:bookId", controller.getBookReviewsById);


router.get('/searchBook/:keyword', async (req, res) => {
    const keyword = req.params.keyword;
    const query = {
      $or: [
        { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive regex search for title
        { author: { $regex: keyword, $options: 'i' } }, // Case-insensitive regex search for author
      ],
    };
  
    try {
      const books = await Book.find(query);
      res.json({ message: books });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;


module.exports = router;

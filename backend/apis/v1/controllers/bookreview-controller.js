
const Book = require('../models/book-model');



async function createNewBook(req,res){

    const { title, author, reviewText, rating, userId,coverImage } = req.body;
    try {
        let book = await Book.findOne({ title, author });

        if (!book) {
            book = new Book({ title, author,coverImage });
        }

        book.reviews.push({ user: userId, reviewText, rating });
        await book.save();

        res.status(201).json({ message: 'Review added successfully', book });
    } catch (error) {
        res.status(500).json({ message: 'Error adding review', error });
    }




}

async function addReview(req, res){

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
}

// async function getALlBooks(req,res)
// {

//     try {
//         const books = await Book.find({},"title author cover");
//         res.status(200).json({"message":books});
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching reviews', error });
//     }
// }

async function getAllBooks(req, res) {
    const { page = 1, limit = 10 } = req.query;
  
    try {
      const books = await Book.find({}, "title author coverImage")
                              .limit(parseInt(limit)) // Convert limit to number
                              .skip((parseInt(page) - 1) * parseInt(limit)) // Convert page to number
                              .exec();
  
      const count = await Book.countDocuments();
  
      res.status(200).json({
        books,
        totalPages: Math.ceil(count / parseInt(limit)),
        currentPage: parseInt(page)
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books', error });
    }
  }

async function editReview(req, res) {

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

};

async function deleteReview(req, res) {

    const { bookId, reviewId } = req.params;
    const { userId } = req.body;

    try {
        // Find the book by ID
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Find the review by ID within the book's reviews
        const review = book.reviews.id(reviewId);
        if (!review) {
            return res.status(700).json({ message: 'Review not found' });
        }

        // Check if the review belongs to the user
        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'You can only delete your own reviews' });
        }

        // Remove the review from the book's reviews array
        book.reviews.pull(reviewId);

        // Save the updated book document
        await book.save();

        res.status(200).json({ message: 'Review deleted successfully', book });
    } catch (error) {
        // Log the error for debugging and send an error response
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Error deleting review', error });
    }

}
async function getBookById(req,res)
{
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if(book)
    {
        res.json({ message: book,type:'details' });

    }
    else {

        res.json({ message:"book not found", type:'error' });

    }
}

async function getBookReviewsById(req,res)
{

    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);
    if(book)
    {
        const bookReviews = book.reviews;
        if(bookReviews){

            res.json({ message: bookReviews,type:'details' });

        }
        else{

            res.json({ message:"no review found", type:'error' });
        }

    }
    else {

        res.json({ message:"book not found", type:'error' });

    }


}

module.exports = {createNewBook,addReview,editReview,deleteReview,getBookById,getBookReviewsById,getAllBooks}